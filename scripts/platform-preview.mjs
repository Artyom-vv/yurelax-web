import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist/yurelax-web/browser');
const indexFile = join(root, 'index.csr.html');
const port = Number(process.env.PORT ?? 4300);
const profile = { playerId: '4a606b70-9ee3-4e0e-8308-30a620ea6588', currentName: 'Suppick',
  identities: [{ playerId: '4a606b70-9ee3-4e0e-8308-30a620ea6588', identityId: '7af08cd0-ac29-414b-bb62-a87c1de41fd5',
    provider: 'MINECRAFT', externalId: '4a606b70-9ee3-4e0e-8308-30a620ea6588', verifiedAt: '2026-08-20T00:00:00Z' }] };
const offers = { items: [
  offer('hunt.class.shadow', 'Теневой охотник', 'Мобильный класс с рывком сквозь линию противника.', 'hunt', '450', true),
  offer('global.prefix.aurora', 'Префикс «Аврора»', 'Глобальный визуальный префикс для чата и профиля.', null, '900', true),
  offer('hunt.class.alchemist', 'Алхимик', 'Тактический класс со смесями поддержки и контроля.', 'hunt', '620', false),
] };
const purchases = { items: [{ id: '77d28c39-6b7a-4a89-9244-34cb931a67c9', offerCode: 'hunt.starter.bundle',
  playerId: profile.playerId, productCode: 'hunt.starter.bundle', quantity: 1, currencyCode: 'GEMS', unitPrice: '300', totalPrice: '300',
  ledgerTransactionId: '447cb266-e2fe-4894-a0e5-967be2e45393',
  purchasedAt: '2026-08-21T15:38:00Z', status: 'CONFIRMED' }], page: { nextCursor: null, hasMore: false } };
const entitlements = { items: [
  right('hunt.class.scout', 'hunt', 'hunt/class/scout', null, false, 'NOT_ACTIVATABLE'),
  right('global.prefix.aurora', null, 'profile/prefix/aurora', '2026-12-31T21:00:00Z', true, null),
] , page: { nextCursor: null, hasMore: false } };

createServer(async (request, response) => {
  const path = new URL(request.url ?? '/', `http://${request.headers.host}`).pathname;
  const api = route(path, request.method ?? 'GET');
  if (api) return json(response, api.status, api.body);
  const relative = normalize(path).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]/, '');
  let file = relative ? join(root, relative) : indexFile;
  try { if ((await stat(file)).isDirectory()) file = indexFile; await send(response, file); }
  catch { await send(response, indexFile); }
}).listen(port, '127.0.0.1', () => console.log(`Yurelax platform preview: http://127.0.0.1:${port}`));

function route(path, method) {
  if (path === '/api/session' && method === 'GET') return ok({ authenticated: true, csrfToken: 'preview-csrf-token-0000000000000000' });
  if (path === '/api/session/logout' && method === 'POST') return { status: 204, body: null };
  if (path === '/api/me/profile') return ok(profile);
  if (path === '/api/storefront') return ok(offers);
  if (path === '/api/me/purchases') return ok(purchases);
  if (path === '/api/me/entitlements') return ok(entitlements);
  return null;
}

function offer(code, name, description, gameCode, amount, eligible) {
  return { code, productCode: code, productName: name, productDescription: description, productKind: 'PERMISSION',
    deliveryMode: 'ENTITLEMENT', purchasePolicy: 'SINGLE_ACTIVE', providerCode: gameCode ?? 'platform',
    fulfillmentKey: code, grants: [{ kind: 'PERMISSION' }], requirement: null, gameCode, active: true,
    prices: [{ currencyCode: 'GEMS', amount }], eligibility: { eligible,
      reasons: eligible ? [] : [{ code: 'PROGRESSION_LEVEL_REQUIRED', requirement: { kind: 'PROGRESSION_LEVEL' }, actual: '2' }] },
    effectiveFrom: '2026-08-20T00:00:00Z', effectiveUntil: null };
}

function right(productCode, gameCode, entitlementKey, expiresAt, canActivate, blockedReason) {
  return { id: randomUUID(), purchaseId: purchases.items[0].id, playerId: profile.playerId, productCode, grantOrdinal: 1,
    kind: 'PERMISSION', purchasePolicy: 'SINGLE_ACTIVE', ownershipPolicy: 'DENY_DUPLICATE',
    providerCode: gameCode ?? 'platform', entitlementKey, gameCode, activationPolicy: null, status: 'ACTIVE',
    grantedAt: '2026-08-21T15:38:00Z', startsAt: '2026-08-21T15:38:00Z', expiresAt, consumedAt: null, revokedAt: null,
    activationState: { canActivate, blockedReason, activeActivation: null, lifetimeUsed: 0, lifetimeRemaining: null,
      periodUsed: 0, periodRemaining: 1, periodResetsAt: null } };
}

function ok(body) { return { status: 200, body }; }
function json(response, status, body) { response.writeHead(status, body ? { 'content-type': 'application/json' } : {}); response.end(body ? JSON.stringify(body) : undefined); }
async function send(response, file) { const body = await readFile(file); response.writeHead(200, { 'content-type': mime(extname(file)) }); response.end(body); }
function mime(extension) { return ({ '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.woff2': 'font/woff2' })[extension] ?? 'application/octet-stream'; }
