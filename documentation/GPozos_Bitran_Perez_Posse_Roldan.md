**Planificar para abastecer: priorización de inversiones hídricas en Delfín Gallo** 

*Trabajo Final Integrador*

**Bitran Agustina M., Perez Francisco M., Posse Gonzalo, Roldán Lucas V.**

*Universidad Tecnológica Nacional, Facultad Regional Tucumán*

*Investigación Operativa*

Profesores: Dra. Ing. Gramajo Guadalupe, Ing. Rojas Cristina, Ing. Fraga Alvaro

Tucumán, Abril de 2026

***ABSTRACT—*****El presente trabajo propone un Sistema de Soporte a la Decisión (DSS) para contribuir a la planificación de mejoras en la red de pozos subterráneos y tuberías de Delfín Gallo, desde un enfoque orientado a la cobertura social del servicio. La investigación integra un pronóstico mediante regresión lineal, elaborado a partir de datos del SIPROSA, para estimar la demanda hídrica futura, y un modelo de Programación Lineal Entera Mixta que representa la asignación de caudales desde los pozos hacia los barrios. El modelo busca minimizar el déficit de abastecimiento durante la hora de máxima demanda, considerando la capacidad de producción de los pozos, las limitaciones hidráulicas de las tuberías y el presupuesto disponible. Mediante variables binarias, se determinan los tramos cuya ampliación o reemplazo produce el mayor beneficio sobre el nivel de servicio, proporcionando una priorización de obras respaldada cuantitativamente para orientar un futuro plan de inversión en infraestructura hídrica.**

**I. FUNDAMENTACIÓN**

En la localidad de Delfín Gallo, de donde proviene uno de los integrantes del grupo, las interrupciones en el suministro de agua potable forman parte de la vida cotidiana. Durante el día, el servicio muchas veces no llega o lo hace con una presión tan baja que solo permite un uso limitado, por lo que numerosas familias deben reorganizar sus actividades domésticas para aprovechar el agua en los horarios en que el caudal mejora.

Como respuesta, muchas viviendas incorporaron tanques o tachos de almacenamiento de distintas capacidades, desde recipientes de 200 litros hasta depósitos de 1000 litros, para acumular agua cuando hay suministro y atravesar los períodos sin servicio. Esta práctica reduce parcialmente el impacto del desabastecimiento, pero también implica costos adicionales, almacenamiento precario y una adaptación permanente en la rutina familiar.

En una de las crisis más recientes, el pozo que abastecía a Delfín Gallo se secó y dejó de aportar caudal a la red, lo que agravó la caída de presión y el desabastecimiento en las viviendas. Frente a esta situación, las autoridades recurrieron a otro pozo existente en la zona, en el cual reemplazaron la bomba original por un equipo de mayor capacidad, capaz de impulsar un caudal superior y mejorar la presión entregada al sistema. Al mismo tiempo, se decidió interconectar los barrios con los pozos cercanos, de manera que el abastecimiento deje de depender de una única perforación y pasará a sostenerse en un pequeño sistema de pozos articulados entre sí.

Esta solución de emergencia permitió restablecer el servicio con una presión más adecuada, pero también puso en evidencia la necesidad de planificar de forma anticipada la explotación conjunta de varios pozos subterráneos y sus tuberías que conectan los barrios, en lugar de responder cuando la infraestructura ya entra en crisis. Así se demostró que la solución no pasa por analizar casos aislados, sino por estudiar de manera integrada todo un conjunto de barrios, que no cuentan con fuentes superficiales aprovechables, como los grandes embalses como el Dique El Cadillal, y dependen casi exclusivamente de las aguas subterráneas para garantizar su acceso al agua potable.

A partir de esta experiencia, surgen interrogantes que orientan el presente trabajo. En primer lugar, cabe preguntarse de qué manera la ingeniería puede pasar de soluciones reactivas y puntuales, como el cambio de una bomba o la conexión de emergencia con una perforación cercana, a un análisis sistemático de la operación de una configuración dada de pozos que considere la red de tuberías para abastecer a los domicilios, la distribución en barrios de la población y las limitaciones propias de las fuentes subterráneas disponibles en la zona. En segundo término, interesa indagar cómo los pronósticos de demanda y los modelos de programación lineal pueden traducirse en decisiones concretas sobre el uso de la configuración actual y la mejora de los esquemas de operación más convenientes.

No se busca decidir desde cero la ubicación geográfica de nuevas perforaciones, sino evaluar alternativas de mejora de la operación viables dentro de la infraestructura existente, de modo de maximizar la población abastecida en un caso de consumo crítico; reduciendo la necesidad de estrategias domésticas de emergencia contemplando el crecimiento demográfico en los barrios bajo análisis.

**II. OBJETIVOS**

Ante el déficit histórico de la calidad de vida de la población que habita estas localidades, se propone el desarrollo de una herramienta que contribuya tanto al estudio de la problemática como al fortalecimiento de la SAT, con el fin de mejorar las condiciones de vida de las comunidades rurales.

***II-A. Objetivo Principal***

Formular y aplicar un modelo de Programación Lineal Entera Mixta en Excel Solver para minimizar el déficit de abastecimiento de agua potable durante la hora de máxima demanda proyectada en Delfín Gallo, mediante la asignación de caudales desde los pozos hacia los barrios y la selección de obras de reemplazo de tuberías, considerando las capacidades de los pozos, las limitaciones hidráulicas de la red y el presupuesto de inversión disponible, con el propósito de priorizar mejoras de infraestructura alineadas con el ODS 6\.

***II-B. Objetivos Específicos***

•	Relevar, depurar y consolidar, antes de la formulación del modelo, la información correspondiente a los cuatro pozos y los once barrios analizados, incluyendo capacidades de bombeo, conexiones existentes, longitudes y diámetros de tuberías, población, consumo y demanda hídrica, con el fin de construir una base de parámetros verificable para el modelo de optimización.

•	Estimar la demanda de agua potable para la hora de máximo consumo del año 2030 en cada uno de los once barrios, mediante modelos individuales de regresión lineal aplicados a los registros demográficos disponibles del SIPROSA, evaluando la precisión de las proyecciones mediante el cálculo del error cuadrático medio y expresando los resultados finales en metros cúbicos por hora.

•	Calcular la capacidad hidráulica actual y la capacidad adicional asociada al reemplazo de cada tubería existente, utilizando la ecuación de Hazen-Williams y una presión mínima de servicio de 8 m.c.a., con el propósito de establecer los límites de caudal aplicables a cada conexión entre pozos y barrios.

•	Implementar y resolver en Excel Solver un modelo de Programación Lineal Entera Mixta que combine variables continuas de caudal y déficit con variables binarias de inversión, considerando las capacidades de los pozos y tuberías, las conexiones existentes y el presupuesto disponible. Evaluar un escenario sin inversión y al menos tres escenarios presupuestarios para comparar el déficit, la cobertura y el costo resultante, con el fin de priorizar las obras de reemplazo de tuberías que produzcan el mayor beneficio sobre el nivel de servicio proyectado al año 2030\.

**III. MARCO TEÓRICO**

•	Programación Lineal Entera Mixta (PLEM) aplicada a Redes: Es un modelo matemático que busca optimizar una función objetivo sujeta a un conjunto de restricciones lineales, caracterizado por combinar variables continuas y enteras.

•	Selección de Inversiones y Expansión de Capacidad: Constituye un problema de decisión para determinar qué proyectos ejecutar bajo recursos económicos limitados, modelado frecuentemente mediante la elaboración de presupuestos de capital.

•	Gestión de la Demanda Insatisfecha: Representa la diferencia entre el requerimiento hídrico de un barrio y el caudal real suministrado.

•	Herramientas de Parametrización: La preparación de los datos del modelo requiere métodos complementarios:

•	Regresión Lineal: Técnica estadística empleada para trazar la relación entre variables a lo largo del tiempo, utilizada para proyectar las variables.

•	Ecuación de Hazen-Williams: Expresión empírica utilizada para relacionar la pérdida de carga con el caudal, la longitud, el diámetro y el coeficiente asociado al material y estado de una tubería..

**IV. MARCO CONCEPTUAL**

Para facilitar la lectura y el análisis del modelo, se definen a continuación los conceptos técnicos fundamentales empleados en este trabajo:

•	Caudal: Volumen de agua que circula por una conducción durante una unidad de tiempo. Representado en metros cúbicos por hora (m³/h).

•	Presión de servicio: Presión disponible en la red para permitir que el agua llegue a los usuarios en condiciones adecuadas. Expresada en metros de columna de agua (m.c.a.).

•	Demanda hídrica: Cantidad de agua requerida por la población durante un período determinado. Se estima a partir de la población proyectada, la dotación de agua por habitante y el coeficiente correspondiente a la hora de máximo consumo.

•	Déficit de abastecimiento: Diferencia entre la demanda hídrica de un barrio y el caudal que el sistema puede suministrar durante la hora de máximo consumo.

•	Pérdida de carga: Disminución de la presión disponible producida principalmente por la fricción del agua con las paredes de las tuberías durante su circulación.

•	Red de distribución: Conjunto de tuberías, válvulas y demás elementos que permiten conducir el agua desde las fuentes de abastecimiento hasta los sectores de consumo.

•	Pozo de agua: Obra de captación que permite extraer agua subterránea de un acuífero para incorporar al sistema de abastecimiento.

**V. MARCO CONTEXTUAL**

El abastecimiento de agua potable de Delfín Gallo depende principalmente de pozos que extraen agua de acuíferos subterráneos. Las interrupciones recientes del servicio evidenciaron las limitaciones de la infraestructura existente y la necesidad de planificar de manera conjunta la utilización de los pozos y las posibles mejoras en la red de distribución.

El crecimiento poblacional constituye un factor determinante de la demanda futura de agua potable. Para estimarla, se utilizaron registros históricos de los últimos ocho años correspondientes al área operativa de Delfín Gallo, relevados por los agentes sociosanitarios del Centro de Atención Primaria de la Salud local, perteneciente al SIPROSA. A partir de esta información se aplicó un modelo de regresión lineal para proyectar la población de cada barrio y calcular posteriormente su demanda hídrica futura.

La ubicación y las características de los pozos que abastecen al sector estudiado fueron relevadas a partir de información suministrada por la Ing. Viviana Fernández, jefa del Departamento Cruz Alta. Por otra parte, los requerimientos hídricos proyectados se estimaron utilizando los registros demográficos del SIPROSA \[16\] y la dotación promedio de consumo doméstico por habitante \[8\]. Posteriormente, estos valores se ajustaron mediante el coeficiente de consumo máximo para determinar la demanda de cada barrio durante la hora pico futura \[17\].

Una vez estimada la demanda proyectada, se utilizó Google Earth para delimitar espacialmente el área de estudio e identificar los barrios comprendidos en el sistema \[8\]. Los límites territoriales fueron verificados junto con Monica Rivero, agente sociosanitaria del CAPS de Delfín Gallo, quien aportó su conocimiento sobre el territorio y las áreas de responsabilidad operativa. Esta validación permitió establecer con mayor precisión las unidades territoriales consideradas posteriormente como nodos de demanda. Por otra parte, la red de extracción de agua subterránea se caracterizó mediante información técnica y relevamientos realizados con la colaboración de Rita Pérez y Diego Herrera, integrantes de las áreas de Geología e Hidrogeología de la SAT. Su participación permitió verificar la ubicación, el estado operativo y las principales características técnicas de los pozos que abastecen la zona. La información obtenida fue consolidada para su posterior incorporación al modelo de optimización \[13\].

La red de distribución no cuenta con cañerías maestras que permitan interconectar integralmente la localidad. El sistema opera de manera sectorizada mediante tuberías cuyos diámetros varían entre 50 y 110 mm, con predominio de conducciones de 50 mm. Por este motivo, se adoptó un diámetro representativo de 50 mm para la capacidad hidráulica actual de los tramos. Cada pozo abastece únicamente a determinados barrios mediante las conexiones existentes, por lo que la configuración, longitud y diámetro de las tuberías condicionan la capacidad de conducción y las pérdidas de carga del sistema.

TABLA I

| Nº Pozo | Barrios abastecidos |
| :---- | :---- |
| 45 | El Paraíso, Paraíso II, Wenceslao Posse |
| 138 | El Paraíso, El Paraíso II, San Lorenzo, Wenceslao Posse, El Bosque |
| 122 | La Pila, Malvinas y 79 viviendas |
| 41 | Ntra. Sra. del Carmen, Delfín Gallo, El Bosque, Mariano moreno, San Lorenzo |

Tabla 1\. Cuatro nodos de origen (pozos) hacia los distintos nodos de demanda (barrios). \[15\]

A partir de las especificaciones técnicas relevadas, se elaboró una representación gráfica del sistema de abastecimiento. En la Figura 1 se presenta el diagrama de la red, donde los pozos se representan como nodos de origen, los barrios como nodos de demanda y las tuberías existentes como conexiones dirigidas. Este diagrama permite visualizar la configuración física considerada en el modelo y las rutas habilitadas para la asignación de caudales y la evaluación de posibles obras de reemplazo.

![][image1]

Fig. 1\. Representación de red de distribución de agua en Delfín Gallo.

Para resolver el problema se busca minimizar el costo total, compuesto por la inversión necesaria para el reemplazo de tuberías y la penalización asociada al déficit de abastecimiento durante la hora de máxima demanda. Simultáneamente, el modelo determina los tramos en los que resulta conveniente ejecutar las obras y asigna los caudales desde los pozos hacia los barrios, respetando las capacidades de producción y conducción del sistema.

**VI. DESARROLLO**

Para parametrizar el modelo, se determinó la exigencia hídrica de cada nodo de destino (barrios) proyectada. Debido a las distintas tasas de crecimiento demográfico de cada sector, se aplicó un análisis individualizado mediante 11 proyecciones de tendencia lineal ajustadas por mínimos cuadrados.

La validación estadística de estas proyecciones se realizó calculando la raíz del Error Cuadrático Medio (RMSE) sobre la ventana de datos conocidos. El análisis arrojó un margen de error promedio del 2,73% del volumen poblacional, confirmando una gran precisión d\<el modelo predictivo. \[9\]

El requerimiento hídrico de cada barrio se calculó a partir de la población proyectada y de una dotación técnica de 250 litros por habitante por día. Para representar el escenario de mayor exigencia del sistema, la dotación diaria se dividió por 24 horas y se multiplicó por un coeficiente pico de 1,95. Posteriormente, el resultado se dividió por 1000 para convertir los litros a metros cúbicos y se multiplicó por la población proyectada de cada barrio. De esta manera, se obtuvo la demanda correspondiente a la hora de máximo consumo, expresada en metros cúbicos por hora. Por otra parte, para estimar la capacidad de conducción de las tuberías se adoptó una pérdida de carga admisible de 5 m.c.a., utilizada como parámetro en la aplicación de la ecuación de Hazen-Williams \[18\].

Para representar la operación del sistema y las decisiones de inversión, el modelo combina variables continuas y binarias. Las variables continuas representan los caudales asignados desde los pozos hacia los barrios y el déficit de abastecimiento de cada sector, mientras que las variables binarias indican si se ejecuta o no el reemplazo de una tubería. A partir de estas variables, el modelo permite evaluar qué intervenciones resultan más convenientes para reducir la demanda insatisfecha durante la hora de máximo consumo. Las variables de decisión son:

•	*Xij*: Variable continua que representa el caudal de agua bombeado desde el pozo i hacia el barrio j durante la hora pico de consumo (m^3/h)

•	*Dj*: Variable continua que representa el déficit de abastecimiento del barrio j durante la hora máxima de consumo, expresada en m^3/h

•	*Yij*: Variable binaria que adopta el valor de 1 si se decide ejecutar la obra de reemplazo de la tubería en el tramo i-j, y 0 en caso contrario

Del mismo modo, nuestros índices serán:

•	i ∈ I, perteneciente a los nodos de origen (Los distintos pozos de agua)

•	j ∈ J, perteneciente a los nodos destino (Los distintos barrios con su demanda en la localidad).

La función objetivo se formuló para minimizar el costo total del sistema, compuesto por el costo de inversión asociado al reemplazo de las tuberías y la penalización (P) correspondiente al déficit de abastecimiento durante la hora de máximo consumo.

*Min(Z) \= Fij\*Yij \+ P\*Dj*

(1)

Donde:

•	*Fij*: representa el costo de reemplazo de la tubería que conecta el pozo i con el barrio j.

•	P es la penalización asignada a cada m^3/h, una constante equivalente a 5.000.000.

Que se encuentra sujeto a las siguientes restricciones:

1\.	Restricción de oferta: El caudal asignado no puede superar la capacidad máxima de producción horaria *Si en cada pozo*.

*Xij ≤ Si ∀ i*

(2)

2\.	Restricción de demanda: El caudal recibido por cada barrio, sumado a su déficit de abastecimiento, debe ser igual a la demanda proyectada para la hora de máximo consumo.

*Xij \+ Dj ≥ dj ∀ j*  

(3)

3\.	Restricción de capacidad de la red: El caudal asignado a cada tramo está limitado por la capacidad actual de la tubería. Cuando se selecciona la obra de reemplazo, la conexión incorpora una capacidad adicional y su costo de inversión se incluye en la función objetivo.

*Xij ≤ CapActualij \+ (CapAdicionalij\*Yij) ∀ i,j*

(4)

4\.	Restricción de selección de alternativas: en conjunto con la capacidad operativa, el modelo debe identificar y seleccionar la obra de infraestructura más crítica del sistema por el periodo, evaluando simultáneamente todas las rutas y habilitando el reemplazo que resulte un cuello de botella, garantizando un impacto positivo dentro del presupuesto disponible.

*Yij ≤ 3*

(5)

5\.	Restricción de conexiones inexistentes: la configuración de la red no permite que todos los pozos abastecen a todos los barrios. Por este motivo, las conexiones inexistentes o técnicamente inviables se excluyen de las alternativas disponibles, fijando en cero tanto el caudal asignado como la decisión de reemplazo correspondiente a esos tramos.

*Xij \= 0 ∀ (i,j) ∉ ConexionesExistentes*

(6)

*Yij \= 0 ∀ (i,j) ∉ ConexionesExistentes*

(7)

6\.	Naturaleza de las variables: todo caudal debe ser positivo y las decisiones de obra son binarias.

*Xij ≥ 0; Dj ≥ 0; Yij ∈ {0,1} ∀ i,j*

(8)

**VII. INTERPRETACIÓN DE RESULTADOS**

El modelo se resolvió mediante Excel Solver con el objetivo de minimizar el costo total, compuesto por el costo de inversión asociado al reemplazo de tuberías y la penalización correspondiente al déficit de abastecimiento durante la hora de máximo consumo. Para la resolución se estableció un límite de tres obras y un presupuesto máximo de inversión de $175.000.000.

La solución óptima alcanzó un valor total de $649.457.957,29. Este resultado se compone de una inversión en infraestructura de $141.623.200,00, equivalente al 22% del valor de la función objetivo, y un costo asociado al déficit de $507.834.757,29, equivalente al 78% restante.

Considerando una penalización de $5.000.000 por cada m3h de demanda insatisfecha, el déficit total resultante fue de 101.57m3h.

Las obras seleccionadas por el modelo fueron las siguientes:

TABLA II

| Pozo → Barrio | Costo |
| :---- | :---- |
| P45 → El Paraíso | $49.424.800 |
| P138 → San Lorenzo | $31.616.000 |
| P41 → El Bosque | $60.582.400 |
| Total | $141.623.200 |

Tabla 2\. Obras seleccionadas por el modelo en Solver.

Las variables binarias correspondientes a estos tramos adoptaron el valor uno, mientras que las restantes permanecieron en cero. Esto indica que, bajo las condiciones establecidas, estas intervenciones constituyen la combinación de obras que produce el menor costo total, considerando simultáneamente la inversión y la demanda insatisfecha.

La demanda total proyectada para los once barrios fue de 212,32m3h., de los cuales el sistema logró suministrar 110,75  .. En consecuencia, la cobertura alcanzada fue del 52%, mientras que el déficit representó el 48% de la demanda proyectada.

Los barrios con mayores déficits fueron Mariano Moreno, con 21,87 m³/h; La Pila, con 19,20 m³/h; y Delfín Gallo, con 18,91 m³/h. Por otra parte, 2 barrios alcanzaron una cobertura completa durante la hora pico. Esta comparación permite identificar los sectores que deberían recibir prioridad en futuros períodos de inversión

Respecto de la capacidad de los pozos, el pozo 138, Complejo el Paraíso presentó el mayor nivel de utilización, alcanzando el 100% de su capacidad máxima. Los pozos restantes registraron distintos niveles de utilización \[x\]. La existencia de capacidad disponible junto con déficits elevados permite inferir que las principales limitaciones se encuentran en la capacidad de las tuberías y en la configuración sectorizada de la red, más que en la producción total de los pozos.

El costo total de las obras seleccionadas representa el 81% del presupuesto disponible, dejando una disponibilidad de $33.376.800,00. Sin embargo, debido al límite máximo de tres intervenciones, no fue posible incorporar otros reemplazos que también podrían reducir la demanda insatisfecha. Este resultado evidencia el efecto conjunto de las restricciones presupuestarias, hidráulicas y operativas sobre la solución.

 Para evaluar la estabilidad del resultado, se resolvió el modelo con distintos límites de obras y niveles de presupuesto. En los escenarios restringidos a tres intervenciones, el aumento del presupuesto desde $175 millones hasta $300 millones no modificó las tuberías seleccionadas ni redujo el déficit, manteniéndose como prioritarios los tramos anteriormente seleccionados.

  Este comportamiento demuestra que, a partir del nivel presupuestario analizado, la principal limitación del sistema no es la disponibilidad económica, sino la cantidad de obras permitidas y la configuración sectorizada de la red. En consecuencia, una mejora sustancial del abastecimiento requiere ampliar la capacidad de intervención y no solamente incrementar el presupuesto.

**VIII. CONCLUSIÓN**

 El modelo de Programación Lineal Entera Mixta permitió determinar simultáneamente la asignación de caudales y las obras de reemplazo de tuberías más convenientes dentro de las condiciones presupuestarias y operativas establecidas. Los resultados respaldan cuantitativamente el planteo de la fundamentación: la infraestructura actual de Delfín Gallo presenta limitaciones significativas frente al crecimiento demográfico proyectado al año 2030, y una única etapa de inversión no resulta suficiente para resolver completamente el déficit de abastecimiento durante la hora de máximo consumo.

  El análisis también evidencia que la principal limitación del sistema no se encuentra exclusivamente en la capacidad de producción de los pozos, sino en la capacidad de conducción y en la configuración sectorizada de la red. La ausencia de cañerías maestras e interconexiones limita las alternativas de asignación, debido a que cada barrio depende de un conjunto reducido de conexiones. En consecuencia, aun cuando algunos pozos presentan capacidad disponible, esta no siempre puede aprovecharse para abastecer a los sectores con mayores déficits.

  Estos resultados refuerzan la necesidad de sustituir las respuestas aisladas de emergencia por una estrategia de planificación que:

* Organice el presupuesto de inversión en distintas etapas y períodos.   
* Priorice los tramos que produzcan un mayor beneficio sobre el abastecimiento.  
* Evalúe futuras interconexiones entre pozos para aprovechar la capacidad disponible y aumentar la flexibilidad de la red.

El modelo desarrollado debe entenderse como un prototipo aplicado inicialmente a Delfín Gallo. Aunque sus resultados dependen de la información y de los supuestos adoptados para esta localidad, su estructura puede replicarse y ampliarse a otros sistemas de abastecimiento. Con un relevamiento suficientemente detallado de los pozos, las tuberías, la demanda proyectada y los costos de intervención, la herramienta podría extenderse a otras localidades del este tucumano; generando así una base metodológica para desarrollar un Sistema de Soporte a la Decisión de alcance regional, capaz de comparar escenarios, identificar obras prioritarias y organizar las inversiones en diferentes períodos. Nuestro modelo podría contribuir en el futuro a la formulación de un plan integral de infraestructura hídrica para el este de Tucumán, orientando los recursos hacia los sectores con mayores necesidades y promoviendo una gestión preventiva del abastecimiento de agua potable.

Más allá de las cuestiones técnicas necesarias que requirieron de toda nuestra atención para ser resueltas, no queremos dejar de mencionar lo necesarias que nos parecen estas investigaciones en el contexto de nuestra provincia. Organismos como la SAT, se ven sumamente beneficiados con conocimientos de este tipo, permitiéndoles enfocar su atención y sus recursos en mejorar el servicio y facilitando el descubrimiento de debilidades y oportunidades de mejora. Resaltamos también el arduo trabajo que implica brindar un servicio como este, y que ante reiteradas quejas de la población, es importante también dar a conocer que, desde adentro, se intenta siempre avanzar y crecer. 

Por otra parte, nos parece importante expresar nuestra conclusión como equipo de trabajo. Como estudiantes, no siempre se nos presenta la oportunidad de desarrollar algo de principio a fin cómo fue esta investigación; valoramos mucho el poder salir a buscar la información, contactarnos con profesionales, hacer trabajo de campo y lograr plasmarlo luego en modelos verbales y matemáticos. Buscamos analizar siempre cada dato, cada relación, cada resultado como equipo; trabajamos muy bien en grupo, dando lo mejor de cada uno, dividiendo las tareas y apoyándonos en lo necesario. Fue una experiencia totalmente positiva, que nos deja muchas herramientas y por sobre todo, de la cual estamos orgullosos de su resultado, que ha quedado aquí plasmado. 

**IX. ANEXOS**

Se proporciona el modelo desarrollado con el formato Excel, utilizando el complemento de Solver. [PL\_GPozos](https://frtutneduar-my.sharepoint.com/:x:/g/personal/lucasvalentin_roldan_alu_frt_utn_edu_ar/IQAJSaJ4io2zQ5HCxyDameU9AaN3V43huSnWEPhpuG1yxtA?e=drLsMj)

**AGRADECIMIENTOS**

Durante la elaboración del presente trabajo, destacamos el apoyo y acompañamiento de nuestros docentes Dra. Ing. Gramajo Guadalupe, Ing. Rojas Cristina e Ing. Fraga Alvaro. Además, fuimos afortunados de contar con nuestra compañera Melisa Albornoz, ayudante de cátedra, que nos orientó en todo momento de la mejor manera.

Así mismo, es para nosotros muy importante resaltar la participación de los profesionales Rita Pérez, Viviana Fernandéz y Daniel Herrera, quienes nos guiaron con sus conocimientos y nos facilitaron la información requerida para esta investigación.

Sumamos a la empresa Perfosuelo Ingeniería y a todos sus trabajadores, que estuvieron a nuestra disposición y nos compartieron su tarea desde adentro.

No queremos olvidarnos del personal de la SAT, desde mesa de entrada, hasta gerencias, por su amabilidad y buena predisposición y sobre todo, su interés en un proyecto como este. Tampoco dejar de lado al equipo del SIPROSA, que nos brindó datos muy valiosos, y en especial a Mónica Rivero, agente sociosanitaria.

Llegar hasta acá significó un desafío para nosotros como estudiantes, pero sin duda aprendimos muchísimo y conectamos con mucha gente muy capaz y predispuesta, concluyendo en una experiencia absolutamente enriquecedora.

**X. REFERENCIAS**

\[1\] UNet. (s. f.). LAB-1-95. [https://www.unet.edu.ve/\~maqflu/doc/LAB-1-95.htm](https://www.unet.edu.ve/~maqflu/doc/LAB-1-95.htm) 

\[2\] Citypopulation. (s. f.). Cruz Alta, Tucumán, Argentina. [https://www.citypopulation.de/es/argentina/tucuman/90014\_\_cruz\_alta/](https://www.citypopulation.de/es/argentina/tucuman/90014__cruz_alta/) 

\[3\] World Health Organization. (2023). Drinking-water. [https://www.who.int/es/news-room/fact-sheets/detail/drinking-water](https://www.who.int/es/news-room/fact-sheets/detail/drinking-water) 

\[4\] ArcGIS Experience. (s. f.). Mapa interactivo. [https://experience.arcgis.com/experience/4663838eb88f4d1d81cdde89d15bce64](https://experience.arcgis.com/experience/4663838eb88f4d1d81cdde89d15bce64) 

\[5\] INVOP. (s. f.). Localidades. Google Sheets. [INV-OP-Datos.](https://docs.google.com/spreadsheets/d/1p9CEZgdGi5oLLMT6TuHxE7eJCZf-avYSCZxe04pBm9Y/edit?usp=sharing)

\[6\] Pozos, 2026\. (s. f.). IO Pozos. Google Drive. [2026-Pozos-IO.](https://drive.google.com/drive/folders/1WWZ7jJWt9YT62iJW_9Khl4piQ1QJ1POy?usp=sharing)

\[7\] United Nations. (s. f.). Goal 6: Ensure access to water and sanitation for all. [https://www.un.org/sustainabledevelopment/water-and-sanitation/](https://www.un.org/sustainabledevelopment/water-and-sanitation/) 

\[8\] Sociedad Aguas del Tucumán. (2026). Servicio de agua en Delfín Gallo actualiz jun26 \[Documento interno no publicado\]. [Servicio de agua Delfin Gallo.](https://drive.google.com/file/d/1zW3zVektBJzANNZFcfoRXIZBWV5r6XSo/view?usp=sharing)

\[9\] Anderson, D. R., Sweeney, D. J., Williams, T. A., Camm, J. D., & Martin, K. (2011). Métodos cuantitativos para los negocios. Cengage Learning.

\[10\] Comuna de Delfín Gallo \[@comunarural\_delfingallo\]. (22 de mayo de 2026). \[[Publicación de Instagram](https://www.instagram.com/p/DYpda3VRvFa/)\].

\[11\] IO-Anexo. – Pestaña 2\. (s. f.). Google Docs. [IO-Anexo.](https://docs.google.com/document/d/1waA2dMOOaSLgCUBulGDAik06orJgXZ3KXd9g_eW5WmE/edit?usp=sharing)

\[12\] IO-Anexo. – Pestaña 1\. (s. f.). Google Docs. [IO-Anexo.](https://docs.google.com/document/d/1waA2dMOOaSLgCUBulGDAik06orJgXZ3KXd9g_eW5WmE/edit?usp=sharing)

\[13\] IO-Anexo. – Pestaña 3\. (s. f.). Google Docs. [IO-Anexo.](https://docs.google.com/document/d/1waA2dMOOaSLgCUBulGDAik06orJgXZ3KXd9g_eW5WmE/edit?usp=sharing)

\[14\] IO-Anexo. – Pestaña 4\. (s. f.). Google Docs. [IO-Anexo.](https://docs.google.com/document/d/1waA2dMOOaSLgCUBulGDAik06orJgXZ3KXd9g_eW5WmE/edit?usp=sharing)

\[15\] IO-Anexo. – Pestaña 5\. (s. f.). Google Docs. [IO-Anexo.](https://docs.google.com/document/d/1waA2dMOOaSLgCUBulGDAik06orJgXZ3KXd9g_eW5WmE/edit?usp=sharing)

\[16\] INVOP. (s. f.). RL: Habitantes en Área Operativa. Google Sheets. [INV-OP-Datos.](https://docs.google.com/spreadsheets/d/1p9CEZgdGi5oLLMT6TuHxE7eJCZf-avYSCZxe04pBm9Y/edit?usp=sharing)

\[17\] INVOP. (s. f.). Consumo en lts 2030\. Google Sheets. [INV-OP-Datos.](https://docs.google.com/spreadsheets/d/1p9CEZgdGi5oLLMT6TuHxE7eJCZf-avYSCZxe04pBm9Y/edit?usp=sharing)

\[18\] Universidad Tecnológica Nacional, Facultad Regional Córdoba. (s. f.). Fórmulas empíricas para el cálculo de pérdidas de carga continuas en tuberías. [Fórmulas empíricas para el cálculo de pérdidas de carga continuas en tuberías](https://www.profesores.frc.utn.edu.ar/industrial/instalacionesindustriales/art_interes/tema7.pdf) 

[image1]: <data:image/png;base64,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>