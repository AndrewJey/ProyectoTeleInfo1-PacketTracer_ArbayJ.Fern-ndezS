

<!-- local-development:start -->
# Desarrollo local

Puedes abrir este repositorio en VS Code, Antigravity o Sublime Text. El compilador y los servicios necesarios dependen del componente indicado abajo.

## Archivos ignorados

`.gitignore` excluye credenciales locales, estado del editor y salidas de las herramientas detectadas. No deja de versionar archivos que ya estaban en Git. Los manifiestos, archivos de bloqueo, recursos fuente y scripts de esquema forman parte del código.
<!-- local-development:end -->

<!-- platform-tools:start -->
## Herramientas para otros componentes

### Cisco Packet Tracer

Abre los archivos `.pkt` o `.pka` con Cisco Packet Tracer. Son topologías o actividades de red; su validación se realiza dentro del simulador, probando conectividad y configuración.
<!-- platform-tools:end -->


<!-- improvements-20261120:start -->
## Mejoras y verificación — 2026-11-20 (Planificador VLSM multi-VLAN PYME (compañero de PYME.pkt y subneteo.xlsx))

- **Cambios:** Añadido planificador interactivo (`web-planner/index.html` + `web-planner/vlsm-planner.js`) que asigna subredes VLSM sin solapamiento ordenadas por tamaño, detecta desbordamiento de bloque y genera subinterfaces Cisco IOS `encapsulation dot1Q` persistentes en `localStorage`.
- **Validación:** Node 24 `node --test web-planner/tests/vlsm-planner.test.mjs` (2/2 pruebas aprobadas).
<!-- improvements-20261120:end -->
