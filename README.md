# Proyecto Teleinformática 1 — Red PYME en Cisco Packet Tracer

Diseño de red empresarial PYME en **Cisco Packet Tracer** (`PYME.pkt`), documentación técnica (`Documentación.docx`), hoja de subneteo (`subneteo.xlsx`) y un **planificador web interactivo VLSM + VLANs (Router-on-a-Stick)**.

## Contenido del repositorio

| Archivo / Carpeta | Descripción |
| --- | --- |
| [`PYME.pkt`](PYME.pkt) | Topología principal de red PYME en Cisco Packet Tracer |
| [`Documentación.docx`](Documentaci%C3%B3n.docx) | Documentación técnica del proyecto de Teleinformática 1 |
| [`subneteo.xlsx`](subneteo.xlsx) | Tabla de cálculo de subredes del proyecto |
| [`Arbay_Teleinformatica.rar`](Arbay_Teleinformatica.rar) | Respaldo comprimido original de entregas |
| [`web-planner/index.html`](web-planner/index.html) | Planificador interactivo VLSM multi-VLAN con exportación de CLI Cisco IOS (`encapsulation dot1Q`), persistencia en `localStorage` y tema claro/oscuro |
| [`web-planner/vlsm-planner.js`](web-planner/vlsm-planner.js) | Motor UMD de asignación VLSM ordenada de mayor a menor sin solapamiento |
| [`web-planner/tests/vlsm-planner.test.mjs`](web-planner/tests/vlsm-planner.test.mjs) | Pruebas automatizadas en Node (`node --test`) |

## Compatibilidad con Cisco Packet Tracer (8.2.x / 9.x)

- **Apertura en versiones recientes (compatible):** `PYME.pkt` puede abrirse en **Cisco Packet Tracer 8.2.x y 9.0**, ya que las versiones modernas mantienen retrocompatibilidad con archivos `.pkt` de versiones anteriores (6.x/7.x).
- **Guardado irreversible hacia atrás:** al guardar el archivo desde Packet Tracer 8.2.x o 9.0, el esquema pasa al formato moderno y ya no abrirá en versiones 6.x/7.x.
- **Comandos Cisco IOS compatibles:** las subinterfaces generadas por `web-planner/index.html` (`interface GigabitEthernet0/0.<vlan>`, `encapsulation dot1Q <vlan>`, `ip address <gateway> <mask>`) funcionan directamente en routers modernos de Packet Tracer 8.2.x / 9.x (como `2911`, `4321` o `4331`).
- *Nota de verificación:* `PYME.pkt` se mantuvo intacto sin modificar el archivo binario (sin Packet Tracer GUI en el entorno local) y la lógica VLSM + generación CLI fue verificada con Node 24 (`node --test`).

## Uso rápido del planificador VLSM y pruebas

1. Abre [`web-planner/index.html`](web-planner/index.html) en tu navegador, ajusta el bloque base IPv4/CIDR y los departamentos/VLANs de la PYME, y copia los comandos Router-on-a-Stick.
2. Ejecuta las pruebas unitarias:
   ```powershell
   node --test web-planner/tests/vlsm-planner.test.mjs
   ```

<!-- local-development:start -->
## Desarrollo local

Consulta [RUNNING.md](RUNNING.md) para ubicar cada componente, abrirlo en su IDE, compilarlo y conocer las comprobaciones realizadas y los requisitos pendientes.
<!-- local-development:end -->
