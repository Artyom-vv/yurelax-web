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

  it('updates only the production release variable when a preview value exists', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, git_commit_sha: SHA_TWO}]),
      json([{key: 'WEB_RELEASE_SHA', is_preview: false}, {key: 'WEB_RELEASE_SHA', is_preview: true}]),
      json({message: 'updated'}), json({message: 'updated'}),
      json({deployments: [{deployment_uuid: 'deployment-production-env'}]}),
      json({status: 'finished'}), json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('publish', ENVIRONMENT, fetcher, async () => {});
    assert.equal(result.revision, SHA_ONE);
    assert.equal(fetcher.calls[2].options.method, 'PATCH');
  });

  it('accepts one repository-owned application when Coolify suffixes its name', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, name: 'yurelax-web-yv5e',
        git_repository: 'git@github.com:Artyom-vv/yurelax-web.git', git_commit_sha: SHA_ONE}]),
      json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('reconcile', ENVIRONMENT, fetcher, async () => {});
    assert.equal(result.skipped, true);
  });

  it('provisions one missing public web application before publishing it', async () => {
    const fetcher = sequence([
      json([]), json([{uuid: 'project-uuid', name: 'Yurelax'}]),
      json([{uuid: 'server-uuid', name: 'production', settings: {is_usable: true, is_reachable: true}}]),
      json([{uuid: 'other-destination', name: 'isolated', server_uuid: 'server-uuid'},
        {uuid: 'destination-uuid', name: 'coolify', server_uuid: 'server-uuid'}]),
      json({uuid: 'created-web'}, 201), json({...APPLICATION, uuid: 'created-web',
        fqdn: 'http://generated.example.test', git_commit_sha: SHA_TWO}),
      json([]), json({message: 'created'}, 201), json({message: 'updated'}),
      json({deployments: [{deployment_uuid: 'deployment-created'}]}),
      json({status: 'finished'}), json({status: 'ok', service: 'yurelax-web', revision: SHA_ONE}),
    ]);
    const result = await deployWeb('publish', ENVIRONMENT, fetcher, async () => {});
    assert.equal(result.revision, SHA_ONE);
    const create = fetcher.calls[4];
    assert.match(create.url, /applications\/public$/);
    assert.deepEqual(JSON.parse(create.options.body), {
      project_uuid: 'project-uuid', server_uuid: 'server-uuid', destination_uuid: 'destination-uuid',
      environment_name: 'production',
      git_repository: 'https://github.com/Artyom-vv/yurelax-web.git', git_branch: 'master',
      git_commit_sha: SHA_ONE, name: 'yurelax-web', description: 'Yurelax player cabinet and admin',
      build_pack: 'dockerfile', dockerfile_location: '/Dockerfile', ports_exposes: '4000',
      is_auto_deploy_enabled: false, is_force_https_enabled: true,
      health_check_enabled: true, health_check_path: '/health',
      health_check_port: '4000', autogenerate_domain: true, instant_deploy: false,
    });
    assert.equal(fetcher.calls.at(-1).url, 'https://generated.example.test/health');
  });

  it('does not provision into an ambiguous production server', async () => {
    const fetcher = sequence([
      json([]), json([{uuid: 'project-uuid', name: 'Yurelax'}]),
      json([{uuid: 'server-one', name: 'one'}, {uuid: 'server-two', name: 'two'}]),
    ]);
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT, fetcher, async () => {}),
      /exactly one server; candidates: \["one","two"\]/);
    assert.equal(fetcher.calls.length, 3);
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

  it('reports a redacted deployment log tail on terminal failure', async () => {
    const fetcher = sequence([
      json([{...APPLICATION, git_commit_sha: SHA_TWO}]),
      json([]), json({message: 'created'}, 201), json({message: 'updated'}),
      json({deployments: [{deployment_uuid: 'deployment-failed'}]}),
      json({status: 'failed', logs: 'Build error\nTOKEN=unsafe\nhttps://user:pass@example.test/private'}),
    ]);
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT, fetcher, async () => {}), (error) => {
      assert.match(error.message, /Build error/);
      assert.doesNotMatch(error.message, /unsafe|user:pass/);
      return true;
    });
  });

  it('fails closed when repository identity is missing or ambiguous', async () => {
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT, sequence([
      json([{name: 'duplicate', uuid: 'one', git_repository: 'Artyom-vv/yurelax-web'},
        {name: 'duplicate', uuid: 'two', git_repository: 'Artyom-vv/yurelax-web'}]),
    ]), async () => {}), /Yurelax candidates/);
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT,
      sequence([json([APPLICATION, {...APPLICATION, uuid: 'duplicate'}])]), async () => {}), /exactly one yurelax-web/);
  });

  it('requires a known action, HTTPS and a full commit SHA', async () => {
    await assert.rejects(() => deployWeb('destroy', ENVIRONMENT), /Unknown web release operation/);
    assert.throws(() => deploymentConfig({...ENVIRONMENT, WEB_RELEASE_SHA: 'master'}), /immutable Git commit/);
    assert.throws(() => deploymentConfig({...ENVIRONMENT, COOLIFY_API_URL: 'http:\/\/coolify.example.test'}), /must use HTTPS/);
  });

  it('reports only allowlisted Coolify error fields', async () => {
    const fetcher = sequence([json({message: 'Invalid field', errors: {name: ['Required']}, token: 'hidden'}, 400)]);
    await assert.rejects(() => deployWeb('publish', ENVIRONMENT, fetcher, async () => {}),
      /HTTP 400: {"message":"Invalid field","errors":{"name":\["Required"\]}}/);
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
