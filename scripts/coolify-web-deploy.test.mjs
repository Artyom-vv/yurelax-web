import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {describe, it} from 'node:test';
import {deployWeb, deploymentConfig} from './coolify-web-deploy.mjs';

const SHA_ONE = '1'.repeat(40);
const SHA_TWO = '2'.repeat(40);
const ENVIRONMENT = {
  WEB_RELEASE_SHA: SHA_ONE,
  COOLIFY_WEB_APPLICATION_NAME: 'yurelax-web',
  COOLIFY_WEB_REPOSITORY: 'Artyom-vv/yurelax-web',
  COOLIFY_API_TOKEN: 'secret',
  COOLIFY_API_URL: 'https://coolify.example.test',
};
const APPLICATION = {uuid: 'web-uuid', name: 'yurelax-web', git_repository: 'https://github.com/Artyom-vv/yurelax-web.git',
  fqdn: 'https://yurelax.example.test'};

describe('web production deployment', () => {
  it('pins and verifies one immutable publish revision', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, git_commit_sha: SHA_TWO}]),
      json([]), json({message: 'created'}, 201), json({message: 'updated'}),
      json({deployments: [{deployment_uuid: 'deployment-1'}]}),
      json({status: 'finished'}), json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('publish', ENVIRONMENT, fetcher, async () => {});
    assert.deepEqual(result, {deploymentUuid: 'deployment-1', revision: SHA_ONE, skipped: false});
    const update = fetcher.calls[3];
    assert.equal(update.options.method, 'PATCH');
    assert.equal(JSON.parse(update.options.body).git_commit_sha, SHA_ONE);
  });

  it('does not redeploy an already healthy reconciled revision', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, git_commit_sha: SHA_ONE}]),
      json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('reconcile', ENVIRONMENT, fetcher, async () => {});
    assert.deepEqual(result, {deploymentUuid: null, revision: SHA_ONE, skipped: true});
    assert.equal(fetcher.calls.length, 2);
  });

  it('accepts one repository-owned application when Coolify suffixes its name', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, name: 'yurelax-web-yv5e', git_commit_sha: SHA_ONE}]),
      json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('reconcile', ENVIRONMENT, fetcher, async () => {});
    assert.equal(result.skipped, true);
  });

  it('selects the latest successful revision other than current for rollback', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, git_commit_sha: SHA_ONE}]),
      json([{status: 'failed', git_commit_sha: '3'.repeat(40)},
        {status: 'finished', git_commit_sha: SHA_ONE}, {status: 'finished', git_commit_sha: SHA_TWO}]),
      json([{key: 'WEB_RELEASE_SHA'}]), json({message: 'updated'}), json({message: 'updated'}),
      json({deployments: [{deployment_uuid: 'deployment-2'}]}),
      json({status: 'success'}), json({status: 'ok', service: 'yurelax-web', revision: SHA_TWO}),
    ]);
    const result = await deployWeb('rollback', ENVIRONMENT, fetcher, async () => {});
    assert.equal(result.revision, SHA_TWO);
    assert.equal(JSON.parse(fetcher.calls[4].options.body).git_commit_sha, SHA_TWO);
  });

  it('fails closed without a previous successful revision', async () => {
    const fetcher = sequence([json([{...APPLICATION, git_commit_sha: SHA_ONE}]), json([])]);
    await assert.rejects(() => deployWeb('rollback', ENVIRONMENT, fetcher, async () => {}), /No successful previous/);
  });

  it('fails closed when repository identity is missing or ambiguous', async () => {
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT, sequence([json([])]), async () => {}),
      /exactly one yurelax-web/);
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT,
      sequence([json([APPLICATION, {...APPLICATION, uuid: 'duplicate'}])]), async () => {}), /exactly one yurelax-web/);
  });

  it('requires a known action, HTTPS and a full commit SHA', async () => {
    await assert.rejects(() => deployWeb('destroy', ENVIRONMENT), /Unknown web release operation/);
    assert.throws(() => deploymentConfig({...ENVIRONMENT, WEB_RELEASE_SHA: 'master'}), /immutable Git commit/);
    assert.throws(() => deploymentConfig({...ENVIRONMENT, COOLIFY_API_URL: 'http:\/\/coolify.example.test'}), /must use HTTPS/);
  });
});

describe('web release repository contract', () => {
  it('keeps production credentials outside the public web repository', async () => {
    const workflows = await Promise.all(['../.github/workflows/ci.yml'].map(fixture));
    for (const workflow of workflows) {
      assert.doesNotMatch(workflow, /COOLIFY_API_TOKEN|secrets:/);
      assert.doesNotMatch(workflow, /yurelax-platform\/\.github\/workflows/);
    }
  });

  it('runs an immutable non-root image with semantic health verification', async () => {
    const dockerfile = await fixture('../Dockerfile');
    const pinnedNodeImage = /node:24\.15\.0-bookworm-slim@sha256:[a-f0-9]{64}/g;
    assert.equal(dockerfile.match(pinnedNodeImage)?.length, 2);
    assert.match(dockerfile, /USER node/);
    assert.match(dockerfile, /HEALTHCHECK[\s\S]*127\.0\.0\.1:4000\/health/);
    assert.match(dockerfile, /CMD \["node", "dist\/yurelax-web\/server\/server\.mjs"\]/);
  });
});

function fixture(path) {
  return readFile(new URL(path, import.meta.url), 'utf8');
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {status, headers: {'content-type': 'application/json'}});
}

function sequence(responses) {
  const calls = [];
  const fetcher = async (url, options = {}) => {
    calls.push({url: String(url), options});
    const response = responses.shift();
    if (!response) throw new Error('Unexpected request');
    return response;
  };
  fetcher.calls = calls;
  return fetcher;
}
