'use strict';
const assert = require('assert');
const auth = require('../app/middleware/auth')();
async function check(headers, queries, expected) {
  let called = 0;
  let continued = 0;
  const ctx = {
    queries, request: { header: headers },
    app: { mysql: { get: async (table, options) => {
      called++;
      assert.strictEqual(table, 'user');
      assert.deepStrictEqual(options, expected);
      return { userid: 1 };
    } } },
  };
  await auth(ctx, async () => { continued++; });
  assert.strictEqual(called, expected ? 1 : 0);
  assert.strictEqual(continued, expected ? 1 : 0);
  if (!expected) assert.strictEqual(ctx.body.code, 1);
}
(async () => {
  await check({}, {}, null);
  await check({ type: 'server' }, {}, null);
  await check({ token: '   ' }, {}, null);
  await check({}, { token: [] }, null);
  await check({ token: 'app-key' }, {}, { app_token: 'app-key' });
  await check({ type: 'server', token: 'server-key' }, {}, { server_token: 'server-key' });
  await check({}, { token: [ 'query-key' ] }, { server_token: 'query-key' });
  console.log('auth regression tests passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
