# GPozos

GPozos es un juego educativo e interactivo sobre la planificación de inversiones en una red de abastecimiento de agua potable. El escenario está inspirado en la localidad de Delfín Gallo y transforma un modelo de Programación Lineal en una experiencia breve de toma de decisiones.

La persona que juega asume el rol de gerente de obras. Debe seleccionar exactamente tres tramos de tubería para mejorar la red, equilibrando el costo de cada inversión con la cobertura de población y la reducción del déficit de abastecimiento. Al finalizar, el juego compara la selección realizada con la combinación óptima calculada por el modelo.

## Objetivos del proyecto

- Acercar conceptos de Investigación Operativa y Programación Lineal a través de una interfaz visual.
- Mostrar cómo las decisiones de infraestructura afectan el costo, la cobertura y el déficit.
- Representar de forma accesible una problemática real de planificación hídrica.
- Servir como prototipo de un Sistema de Soporte a la Decisión para priorizar obras.

## Cómo se juega

1. Ingresá el nombre de la persona gerente.
2. Explorá el mapa de pozos, tuberías y barrios.
3. Seleccioná una tubería para consultar su impacto.
4. Confirmá tres inversiones.
5. Revisá el resultado y compará tu plan con la solución óptima del modelo.

La evaluación considera principalmente la cantidad de coincidencias con el plan óptimo, la cobertura alcanzada, el déficit restante y el tiempo utilizado.

## Estado actual

El juego principal está operativo y permite completar la simulación y ver la pantalla de resultados.

El ranking persistente está desactivado intencionalmente mediante la constante hardcodeada `db_desactivated` en [`lib/config.ts`](lib/config.ts). Mientras permanezca en `true`:

- el juego no intenta guardar partidas en la base de datos;
- la pantalla `/ranking` no realiza consultas al servidor;
- la pantalla informa: “No se pudo encontrar un servidor. Contacta a Francisco Perez si necesitas más información.”;
- las rutas `/api/results` responden que la persistencia o el ranking están desactivados.

Para reactivar la persistencia, cambiá `db_desactivated` a `false` y configurá una conexión PostgreSQL válida mediante `DATABASE_URL`.

## Tecnologías

- [Next.js](https://nextjs.org/) 16 con App Router.
- React 19 y TypeScript.
- GSAP para animaciones e interacciones visuales.
- PostgreSQL mediante `pg` para la persistencia del ranking cuando está habilitada.
- CSS propio con diseño responsive y enfoque mobile-first.

## Requisitos

- Node.js compatible con Next.js 16.
- pnpm.
- Una conexión PostgreSQL únicamente si se desea reactivar el ranking.

## Instalación y desarrollo local

Cloná el repositorio e instalá las dependencias:

```bash
git clone https://github.com/FranprzDev/gpozos-game.git
cd gpozos-game
pnpm install
```

Iniciá el servidor de desarrollo:

```bash
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Comandos disponibles

```bash
pnpm dev      # servidor de desarrollo
pnpm lint     # análisis estático
pnpm build    # compilación de producción
pnpm start    # servidor con la compilación generada
```

## Estructura principal

```text
app/
├── page.tsx                 # juego y flujo de decisiones
├── ranking/page.tsx         # pantalla del ranking
├── api/results/route.ts     # API de resultados
└── borrar_historial/route.ts# endpoint de limpieza del ranking
lib/
├── config.ts                # configuración hardcodeada del ranking
└── db.ts                    # conexión y creación de la tabla PostgreSQL
public/
└── docs/                    # material complementario del proyecto
documentation/               # documento académico y modelo conceptual
```

## Modelo y documentación

La explicación académica del problema, los supuestos, las variables de decisión y los resultados del modelo se encuentra en [`documentation/GPozos_Bitran_Perez_Posse_Roldan.md`](documentation/GPozos_Bitran_Perez_Posse_Roldan.md). También se incluye una copia del avance en PDF dentro de [`public/docs/`](public/docs/).

## Créditos

Proyecto académico desarrollado por Bitrán, Pérez, Posse y Roldán, con foco en la planificación de mejoras para redes de abastecimiento de agua potable.
