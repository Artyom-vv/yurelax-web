import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const API_PREFIX = '/api/v1/';
const SHA = /^[a-f0-9]{40}$/;
const SUCCESS = new Set(['finished', 'success']);
const FAILURE = new Set(['failed', 'cancelled', 'error']);
const REQUEST_TIMEOUT_MS = 15_000;
const DEPLOYMENT_TIMEOUT_MS = 900_000;
const POLL_INTERVAL_MS = 5_000;
const RELEASE_ENVIRONMENT = 'WEB_RELEASE_SHA';

/** Publishes one immutable web revision or the last successful predecessor. */
export async function deployWeb(action, environment = process.env, fetcher = fetch, sleep = delay) {
  const config = deploymentConfig(environment);
  const application = await request(config, fetcher, `applications/${config.applicationUuid}`);
  if (application.uuid !== config.applicationUuid || application.name !== config.applicationName) {
    throw new Error('Coolify web application identity does not match repository configuration');
  }
  const target = action === 'publish'
    ? config.releaseSha
    : await previousRevision(config, application.git_commit_sha, fetcher);
  await pinRuntimeRevision(config, target, fetcher);
  await request(config, fetcher, `applications/${config.applicationUuid}`, {
    method: 'PATCH',
    body: JSON.stringify({git_branch: 'master', git_commit_sha: target, is_auto_deploy_enabled: false,
      build_pack: 'dockerfile', dockerfile_location: '/Dockerfile', ports_exposes: '4000',
      health_check_enabled: true, health_check_path: '/health', health_check_port: '4000'}),
  });
  const started = await request(config, fetcher, 'deploy', {
    method: 'POST', body: JSON.stringify({uuid: config.applicationUuid, force: false}),
  });
  const deployments = started.deployments?.flatMap(({deployment_uuid: id}) => id ? [id] : []) ?? [];
  if (deployments.length !== 1) throw new Error(`Coolify returned ${deployments.length} web deployment identities`);
  await waitForDeployment(config, deployments[0], fetcher, sleep);
  await verifyHealth(config.productionUrl, target, fetcher);
  return {deploymentUuid: deployments[0], revision: target};
}

/** Makes the selected immutable revision observable from the running health endpoint. */
async function pinRuntimeRevision(config, revision, fetcher) {
  const path = `applications/${config.applicationUuid}/envs`;
  const variables = await request(config, fetcher, path);
  const matches = variables.filter((entry) => entry.key === RELEASE_ENVIRONMENT);
  if (matches.length > 1) throw new Error('Coolify WEB_RELEASE_SHA must exist at most once');
  await request(config, fetcher, path, {
    method: matches.length === 0 ? 'POST' : 'PATCH',
    body: JSON.stringify({key: RELEASE_ENVIRONMENT, value: revision, is_literal: true, is_preview: false}),
  });
}

/** Selects the newest successful deployment revision other than the currently pinned one. */
async function previousRevision(config, currentRevision, fetcher) {
  if (!SHA.test(currentRevision ?? '')) throw new Error('Coolify web application has no immutable current revision');
  const history = await request(config, fetcher,
    `deployments/applications/${config.applicationUuid}?skip=0&take=20`);
  const previous = history.find((entry) => SUCCESS.has(String(entry.status).toLowerCase())
    && SHA.test(entry.git_commit_sha ?? '') && entry.git_commit_sha !== currentRevision);
  if (!previous) throw new Error('No successful previous web revision is available for rollback');
  return previous.git_commit_sha;
}

/** Waits until Coolify reports a recognized terminal deployment state. */
async function waitForDeployment(config, deploymentUuid, fetcher, sleep) {
  const deadline = Date.now() + DEPLOYMENT_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const deployment = await request(config, fetcher, `deployments/${deploymentUuid}`);
    const status = String(deployment.status ?? '').toLowerCase();
    if (SUCCESS.has(status)) return;
    if (FAILURE.has(status)) throw new Error(`Coolify web deployment ended with status ${status}`);
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error('Coolify web deployment exceeded its timeout');
}

/** Verifies the semantic public health response belongs to the selected Git revision. */
async function verifyHealth(baseUrl, revision, fetcher) {
  const response = await fetcher(new URL('/health', baseUrl), {signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)});
  if (!response.ok) throw new Error(`Web production health failed with HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.status !== 'ok' || payload.service !== 'yurelax-web' || payload.revision !== revision) {
    throw new Error('Web production health returned an unexpected revision');
  }
}

/** Executes one authenticated bounded Coolify request without exposing its token. */
async function request(config, fetcher, path, init = {}) {
  const response = await fetcher(new URL(`${API_PREFIX}${path}`, config.coolifyApiUrl), {
    ...init,
    headers: {authorization: `Bearer ${config.token}`, accept: 'application/json', 'content-type': 'application/json'},
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Coolify ${init.method ?? 'GET'} ${path} failed with HTTP ${response.status}`);
  return response.json();
}

/** Reads and validates every fail-closed web production setting. */
export function deploymentConfig(environment) {
  const releaseSha = required(environment, 'WEB_RELEASE_SHA');
  if (!SHA.test(releaseSha)) throw new Error('WEB_RELEASE_SHA must be a full immutable Git commit SHA');
  return {
    releaseSha,
    applicationUuid: required(environment, 'COOLIFY_WEB_APPLICATION_UUID'),
    applicationName: environment.COOLIFY_WEB_APPLICATION_NAME?.trim() || 'yurelax-web',
    token: required(environment, 'COOLIFY_API_TOKEN'),
    coolifyApiUrl: secureUrl(required(environment, 'COOLIFY_API_URL'), 'COOLIFY_API_URL'),
    productionUrl: secureUrl(required(environment, 'WEB_PRODUCTION_URL'), 'WEB_PRODUCTION_URL'),
  };
}

function required(environment, name) {
  const value = environment[name]?.trim();
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function secureUrl(value, name) {
  const url = new URL(value);
  if (url.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)) {
    throw new Error(`${name} must use HTTPS outside localhost`);
  }
  return url;
}

function delay(milliseconds) { return new Promise((resolve) => setTimeout(resolve, milliseconds)); }

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const action = process.argv[2];
  if (!['publish', 'rollback'].includes(action)) throw new Error('Usage: coolify-web-deploy.mjs <publish|rollback>');
  const result = await deployWeb(action);
  console.info(`${action === 'publish' ? 'Published' : 'Rolled back'} yurelax-web to ${result.revision}`);
}
