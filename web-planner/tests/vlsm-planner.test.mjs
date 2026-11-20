import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const P = require('../vlsm-planner.js');

test('allocates non-overlapping VLSM subnets sorted largest first', () => {
  const res = P.planVlsm('192.168.100.0', 24, [
    { name: 'TI', vlanId: 30, hosts: 12 },
    { name: 'Admin', vlanId: 10, hosts: 50 },
    { name: 'Ventas', vlanId: 20, hosts: 28 }
  ]);
  assert.equal(res.ok, true);
  assert.equal(res.subnets[0].name, 'Admin');
  assert.equal(res.subnets[0].network + '/' + res.subnets[0].prefix, '192.168.100.0/26');
  assert.equal(res.subnets[1].network + '/' + res.subnets[1].prefix, '192.168.100.64/27');
  assert.equal(res.subnets[2].network + '/' + res.subnets[2].prefix, '192.168.100.96/28');
  assert.ok(res.cli.includes('encapsulation dot1Q 10'));
});

test('detects capacity overflow cleanly', () => {
  const res = P.planVlsm('192.168.100.0', 28, [{ name: 'Grande', vlanId: 10, hosts: 50 }]);
  assert.equal(res.ok, false);
});
