/* Planificador VLSM Multi-VLAN y Router-on-a-Stick para PYME (compañero de PYME.pkt y subneteo.xlsx) */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.PymeVlsmPlanner = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function ipToInt(ip) {
    var p = String(ip || '').trim().split('.');
    if (p.length !== 4) return null;
    var v = 0;
    for (var i = 0; i < 4; i++) {
      if (!/^\d{1,3}$/.test(p[i])) return null;
      var n = Number(p[i]);
      if (n > 255) return null;
      v = ((v << 8) | n) >>> 0;
    }
    return v;
  }

  function intToIp(v) {
    v = v >>> 0;
    return [(v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255].join('.');
  }

  function planVlsm(baseIp, basePrefix, departments) {
    var baseInt = ipToInt(baseIp);
    var bp = Number(basePrefix);
    if (baseInt === null || !Number.isInteger(bp) || bp < 8 || bp > 30) {
      return { ok: false, error: 'Bloque base IPv4/CIDR inválido.' };
    }
    var baseMask = (0xffffffff << (32 - bp)) >>> 0;
    var blockStart = (baseInt & baseMask) >>> 0;
    var blockEnd = (blockStart + Math.pow(2, 32 - bp) - 1) >>> 0;

    var sorted = (departments || []).map(function (d, idx) {
      return {
        name: String(d.name || ('VLAN ' + (idx + 1))).trim(),
        vlanId: Number(d.vlanId) || ((idx + 1) * 10),
        hosts: Math.max(1, Number(d.hosts) || 1)
      };
    }).sort(function (a, b) { return b.hosts - a.hosts; });

    var cursor = blockStart;
    var plan = [];
    for (var i = 0; i < sorted.length; i++) {
      var dept = sorted[i];
      var hostBits = Math.ceil(Math.log2(dept.hosts + 2));
      if (hostBits < 2) hostBits = 2;
      var prefix = 32 - hostBits;
      var size = Math.pow(2, hostBits);
      if (cursor + size - 1 > blockEnd) {
        return { ok: false, error: 'Espacio insuficiente en ' + intToIp(blockStart) + '/' + bp + ' para "' + dept.name + '" (' + dept.hosts + ' hosts).' };
      }
      var mask = (0xffffffff << hostBits) >>> 0;
      var broadcast = (cursor + size - 1) >>> 0;
      plan.push({
        name: dept.name,
        vlanId: dept.vlanId,
        requestedHosts: dept.hosts,
        usableHosts: size - 2,
        prefix: prefix,
        network: intToIp(cursor),
        mask: intToIp(mask),
        gateway: intToIp(cursor + 1),
        lastHost: intToIp(broadcast - 1),
        broadcast: intToIp(broadcast)
      });
      cursor = (cursor + size) >>> 0;
    }

    var cli = ['configure terminal', 'interface GigabitEthernet0/0', ' no shutdown', 'exit'];
    plan.forEach(function (s) {
      cli.push('interface GigabitEthernet0/0.' + s.vlanId);
      cli.push(' description ' + s.name);
      cli.push(' encapsulation dot1Q ' + s.vlanId);
      cli.push(' ip address ' + s.gateway + ' ' + s.mask);
      cli.push('exit');
    });
    cli.push('end');
    return { ok: true, baseBlock: intToIp(blockStart) + '/' + bp, subnets: plan, cli: cli.join('\n') };
  }

  return { planVlsm: planVlsm };
});
