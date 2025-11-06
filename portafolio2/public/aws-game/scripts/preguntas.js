(() => {
    document.addEventListener("DOMContentLoaded", () => {
        // Configuración avanzada de preguntas
        const preguntas = [
            {
                texto: "¿Cuál es el proveedor de nube más usado del mundo?",
                opciones: ["Google Cloud", "Azure", "AWS", "IBM Cloud"],
                correcta: "AWS",
                categoria: "General",
                explicacion: "AWS lidera el mercado con un 32% de cuota en 2023"
            },
            {
                texto: "¿Qué servicio de AWS permite ejecutar código sin servidores?",
                opciones: ["EC2", "Lambda", "S3", "RDS"],
                correcta: "Lambda",
                categoria: "Compute",
                explicacion: "Lambda es el servicio serverless por excelencia de AWS"
            },
            {
                texto: "¿Cuál es el servicio de almacenamiento de objetos en AWS?",
                opciones: ["EBS", "S3", "EFS", "Glacier"],
                correcta: "S3",
                categoria: "Storage",
                explicacion: "S3 (Simple Storage Service) es el servicio de objetos más popular"
            },
            {
                texto: "¿Cuál es el modelo de servicio en la nube donde el proveedor gestiona todo, desde la infraestructura hasta las aplicaciones?",
                opciones: ["IaaS", "PaaS", "SaaS", "FaaS"],
                correcta: "SaaS",
                categoria: "General",
                explicacion: "SaaS ofrece aplicaciones completas listas para usar, sin que el cliente deba gestionar la infraestructura ni plataformas."
            },
            {
                texto: "¿Qué modelo de despliegue de nube permite ejecutar servicios tanto en servidores locales como en la nube pública?",
                opciones: ["Nube pública", "Nube privada", "Nube híbrida", "Multinube"],
                correcta: "Nube híbrida",
                categoria: "General",
                explicacion: "La nube híbrida combina recursos on‑premise con recursos en la nube pública para mayor flexibilidad y escalabilidad."
            },
            {
                texto: "¿Cuál de los siguientes no es un modelo de servicio en la nube tradicional?",
                opciones: ["IaaS", "PaaS", "XaaS", "LaaS"],
                correcta: "LaaS",
                categoria: "General",
                explicacion: "IaaS, PaaS y XaaS ('Everything as a Service') son modelos reconocidos; 'LaaS' no lo es."
            },
            {
                texto: "¿Cuál es la principal ventaja de usar IaaS sobre infraestructura tradicional?",
                opciones: ["Mayor control de la capa de red", "Sin costes por uso", "Gestión completa de la plataforma", "Pago por uso y elasticidad"],
                correcta: "Pago por uso y elasticidad",
                categoria: "General",
                explicacion: "IaaS permite escalar recursos bajo demanda y sólo pagar por lo consumido, sin inversión inicial en hardware."
            },
            {
                texto: "¿Qué proveedor de nube pública lanzó primero su servicio comercial?",
                opciones: ["Google Cloud", "Microsoft Azure", "AWS", "IBM Cloud"],
                correcta: "AWS",
                categoria: "General",
                explicacion: "AWS lanzó EC2 y S3 en 2006, siendo el primer servicio de nube pública comercial masivo."
            },
            {
                texto: "¿Qué servicio en la nube se encarga típicamente del balanceo de carga (load balancing)?",
                opciones: ["DNS", "CDN", "LBaaS", "WAF"],
                correcta: "LBaaS",
                categoria: "Networking",
                explicacion: "LBaaS (Load Balancer as a Service) distribuye tráfico entre varias instancias para alta disponibilidad."
            },
            {
                texto: "¿Cuál es la función principal de un CDN (Content Delivery Network)?",
                opciones: ["Almacenar bases de datos", "Distribuir contenido estático globalmente", "Proveer entornos de desarrollo", "Controlar acceso de usuarios"],
                correcta: "Distribuir contenido estático globalmente",
                categoria: "Networking",
                explicacion: "Un CDN reduce latencia almacenando copias de contenido estático en múltiples ubicaciones geográficas."
            },
            {
                texto: "¿Qué protocolo se usa habitualmente para conectar redes privadas virtuales (VPN) a la nube?",
                opciones: ["HTTP", "IPsec", "SMTP", "FTP"],
                correcta: "IPsec",
                categoria: "Networking",
                explicacion: "IPsec proporciona túneles seguros entre redes on‑premise y nubes públicas."
            },
            {
                texto: "¿Qué significa ‘auto‑scaling’ en nube?",
                opciones: ["Actualizar manualmente instancias", "Añadir o quitar recursos según demanda", "Copiar datos entre regiones", "Configurar firewalls automáticamente"],
                correcta: "Añadir o quitar recursos según demanda",
                categoria: "Compute",
                explicacion: "El auto‑scaling ajusta el número de instancias en función de métricas (CPU, tráfico) para optimizar costes y rendimiento."
            },
            {
                texto: "En un entorno de contenedores, ¿qué herramienta se usa para orquestar múltiples contenedores?",
                opciones: ["Docker Compose", "Kubernetes", "GitLab", "Terraform"],
                correcta: "Kubernetes",
                categoria: "Contenedores",
                explicacion: "Kubernetes automatiza despliegue, escalado y gestión de contenedores en clústeres."
            },
            {
                texto: "¿Cuál es la ventaja de usar contenedores frente a máquinas virtuales?",
                opciones: ["Mayor aislamiento de hardware", "Menor sobrecarga y arranque más rápido", "Mejor rendimiento de GPU", "Seguridad absoluta"],
                correcta: "Menor sobrecarga y arranque más rápido",
                categoria: "Contenedores",
                explicacion: "Los contenedores comparten kernel y recursos, iniciando en segundos con menor coste que VMs."
            },
            {
                texto: "¿Qué servicio de Azure permite desplegar contenedores Docker sin administrar servidores?",
                opciones: ["Azure VM", "AKS", "App Service", "Azure Container Instances"],
                correcta: "Azure Container Instances",
                categoria: "Serverless",
                explicacion: "ACI permite ejecutar contenedores aislados en la nube sin provisión de infraestructuras."
            },
            {
                texto: "¿Cuál de estas opciones corresponde a un servicio serverless de Google Cloud?",
                opciones: ["Compute Engine", "Cloud Run", "App Engine flexible", "Bare Metal Solution"],
                correcta: "Cloud Run",
                categoria: "Serverless",
                explicacion: "Cloud Run ejecuta contenedores en un entorno serverless, escalando automáticamente."
            },
            {
                texto: "¿Qué tecnología subyace en la virtualización de hardware para múltiples VMs?",
                opciones: ["Docker", "KVM", "Terraform", "Serverless"],
                correcta: "KVM",
                categoria: "Infraestructura",
                explicacion: "KVM es un hypervisor tipo 1 integrado en el kernel de Linux para ejecutar VMs."
            },
            {
                texto: "¿Qué servicio de AWS se utiliza principalmente para redes definidas por software (SDN)?",
                opciones: ["VPC", "Direct Connect", "Route 53", "CloudFront"],
                correcta: "VPC",
                categoria: "Networking",
                explicacion: "VPC (Virtual Private Cloud) permite definir redes virtuales aisladas en AWS."
            },
            {
                texto: "¿Cuál es la utilidad principal de un servicio de DNS gestionado en la nube?",
                opciones: ["Almacenar archivos grandes", "Resolver nombres de dominio a IPs", "Gestionar contenedores", "Enviar correos"],
                correcta: "Resolver nombres de dominio a IPs",
                categoria: "Networking",
                explicacion: "Un DNS gestionado facilita la administración de zonas y reduce latencia en resoluciones."
            },
            {
                texto: "¿Qué servicio en la nube suele ofrecer replicación automática de datos entre regiones?",
                opciones: ["Almacenamiento de objetos (S3/GCS)", "Compute Engine", "Cloud Functions", "IAM"],
                correcta: "Almacenamiento de objetos (S3/GCS)",
                categoria: "Storage",
                explicacion: "Los buckets de objetos pueden replicar automáticamente datos entre varias regiones para redundancia."
            },
            {
                texto: "¿Cuál es el propósito de un servicio de Backup as a Service en nube?",
                opciones: ["Provisionar servidores", "Gestión de identidades", "Realizar copias de seguridad automatizadas", "Orquestación de contenedores"],
                correcta: "Realizar copias de seguridad automatizadas",
                categoria: "Storage",
                explicacion: "BaaS simplifica la creación, programación y restauración de backups sin infraestructura propia."
            },
            {
                texto: "¿Qué significa ‘multi‑zona’ en el contexto de despliegue en nube?",
                opciones: ["Usar múltiples proveedores", "Distribuir recursos en varias zonas de disponibilidad", "Tener varias cuentas", "Usar contenedores y VMs"],
                correcta: "Distribuir recursos en varias zonas de disponibilidad",
                categoria: "Infraestructura",
                explicacion: "Multi‑zona garantiza alta disponibilidad al replicar servicios en distintas zonas de un mismo región."
            },
            {
                texto: "¿Qué servicio de AWS permite ejecutar contenedores en un clúster sin gestionar la capa de EC2?",
                opciones: ["ECS EC2", "EKS", "ECS Fargate", "Lambda"],
                correcta: "ECS Fargate",
                categoria: "Contenedores",
                explicacion: "Fargate abstrae la infraestructura subyacente, permitiendo ejecutar contenedores sin servidores."
            },
            {
                texto: "¿Cuál es la función de un WAF (Web Application Firewall) en la nube?",
                opciones: ["Balancear carga", "Proteger aplicaciones web de ataques", "Gestionar DNS", "Almacenar objetos"],
                correcta: "Proteger aplicaciones web de ataques",
                categoria: "Seguridad",
                explicacion: "Un WAF filtra y monitoriza tráfico HTTP para proteger contra inyecciones SQL, XSS y otros ataques."
            },
            {
                texto: "¿Qué servicio de Azure proporciona gestión de identidades y control de acceso?",
                opciones: ["Azure Active Directory", "Key Vault", "Traffic Manager", "Blob Storage"],
                correcta: "Azure Active Directory",
                categoria: "Seguridad",
                explicacion: "Azure AD administra usuarios, grupos y permisos para aplicaciones en la nube."
            },
            {
                texto: "¿Qué nivel de servicio en AWS ofrece almacenamiento en bloque para instancias EC2?",
                opciones: ["S3", "Glacier", "EFS", "EBS"],
                correcta: "EBS",
                categoria: "Storage",
                explicacion: "EBS (Elastic Block Store) proporciona volúmenes persistentes en bloque para EC2."
            },
            {
                texto: "¿Cuál es la ventaja principal de usar bases de datos en modo serverless?",
                opciones: ["Coste fijo mensual", "Escalado automático según demanda", "Control total del hardware", "Requiere aprovisionamiento previo"],
                correcta: "Escalado automático según demanda",
                categoria: "Bases de datos",
                explicacion: "Las bases serverless ajustan capacidad y facturación según uso real sin aprovisionar nodos."
            },
            {
                texto: "¿Qué servicio de Google Cloud es un motor de base de datos relacional totalmente gestionado?",
                opciones: ["BigQuery", "Cloud SQL", "Firestore", "Spanner"],
                correcta: "Cloud SQL",
                categoria: "Bases de datos",
                explicacion: "Cloud SQL soporta MySQL, PostgreSQL y SQL Server con gestión automática de parches y backups."
            },
            {
                texto: "¿Cuál es el propósito de un servicio de monitorización (Observability) en nube?",
                opciones: ["Desplegar contenedores", "Almacenar archivos", "Recolectar métricas, logs y trazas", "Gestionar usuarios"],
                correcta: "Recolectar métricas, logs y trazas",
                categoria: "Monitoreo",
                explicacion: "Observability centraliza y analiza datos de rendimiento para detectar y diagnosticar problemas."
            },
            {
                texto: "¿Qué servicio de AWS ofrece paneles y alarmas de CloudWatch?",
                opciones: ["CloudTrail", "CloudWatch", "X-Ray", "Config"],
                correcta: "CloudWatch",
                categoria: "Monitoreo",
                explicacion: "CloudWatch recopila métricas de recursos, permite crear alarmas y dashboards personalizados."
            },
            {
                texto: "¿Cuál es la principal diferencia entre CloudWatch Logs y CloudTrail?",
                opciones: ["Logs de aplicaciones vs registros de API", "Almacenamiento vs compute", "IAM vs VPC", "Balanceo vs seguridad"],
                correcta: "Logs de aplicaciones vs registros de API",
                categoria: "Monitoreo",
                explicacion: "CloudWatch Logs recoge logs de sistemas y apps; CloudTrail registra llamadas a la API de AWS."
            },
            {
                texto: "¿Qué servicio de AWS permite gestionar claves de cifrado y secretos?",
                opciones: ["Secrets Manager", "Certificate Manager", "KMS", "Identity Manager"],
                correcta: "KMS",
                categoria: "Seguridad",
                explicacion: "KMS (Key Management Service) administra cifrado simétrico/asimétrico y rotación de claves."
            },
            {
                texto: "¿Cuál es la función de un servicio de CDN en la mejora del rendimiento?",
                opciones: ["Reducir costes de almacenamiento", "Minimizar latencia al acercar contenido al usuario", "Aislar redes privadas", "Gestionar contenedores"],
                correcta: "Minimizar latencia al acercar contenido al usuario",
                categoria: "Networking",
                explicacion: "Al cachear en ubicaciones globales, un CDN baja tiempos de carga y mejora experiencia."
            },
            {
                texto: "¿Qué servicio de AWS facilita la integración continua y entrega continua (CI/CD)?",
                opciones: ["CodeDeploy", "CodeBuild", "CodePipeline", "CodeCommit"],
                correcta: "CodePipeline",
                categoria: "DevOps",
                explicacion: "CodePipeline orquesta pasos de compilación, test y despliegue de forma automática."
            },
            {
                texto: "¿Cuál es el propósito de Terraform en la nube?",
                opciones: ["Monitorizar recursos", "Gestionar infraestructura como código", "Almacenar objetos", "Crear contenedores"],
                correcta: "Gestionar infraestructura como código",
                categoria: "DevOps",
                explicacion: "Terraform permite definir y versionar infraestructura en archivos HCL y desplegarla de forma reproducible."
            },
            {
                texto: "¿Qué significa ‘immutable infrastructure’ en DevOps?",
                opciones: ["Infraestructura que nunca se actualiza", "Reemplazar en lugar de modificar servidores existentes", "Bases de datos inmutables", "Contenedores sin cambios"],
                correcta: "Reemplazar en lugar de modificar servidores existentes",
                categoria: "DevOps",
                explicacion: "Con infraestructura inmutable, cada cambio despliega nuevos servidores en vez de parchear los existentes."
            },
            {
                texto: "¿Cuál es la ventaja de usar un servicio de mensajería (p.ej. SQS) en arquitecturas desacopladas?",
                opciones: ["Mejor rendimiento de GPU", "Comunicación asincrónica y tolerante a fallos", "Gestión de usuarios", "Balanceo de carga"],
                correcta: "Comunicación asincrónica y tolerante a fallos",
                categoria: "Arquitectura",
                explicacion: "Las colas desacoplan productores y consumidores, mejorando resiliencia y escalabilidad."
            },
            {
                texto: "¿Qué servicio de AWS ofrece un bus de eventos para integrar microservicios?",
                opciones: ["EventBridge", "SNS", "SQS", "Kinesis"],
                correcta: "EventBridge",
                categoria: "Arquitectura",
                explicacion: "EventBridge enruta eventos de múltiples orígenes a destinos configurables con filtros avanzados."
            },
            {
                texto: "¿Cuál de estos servicios se usa para análisis de big data en AWS?",
                opciones: ["Redshift", "DynamoDB", "ElastiCache", "EBS"],
                correcta: "Redshift",
                categoria: "Analytics",
                explicacion: "Redshift es un data warehouse gestionado para consultas SQL de grandes volúmenes de datos."
            },
            {
                texto: "¿Qué servicio de Google Cloud está optimizado para análisis de petabytes con SQL?",
                opciones: ["BigQuery", "Dataflow", "Dataproc", "Firestore"],
                correcta: "BigQuery",
                categoria: "Analytics",
                explicacion: "BigQuery es un almacén de datos serverless que permite consultas rápidas sobre grandes conjuntos de datos."
            },
            {
                texto: "¿Qué característica define a un servicio ‘serverless’?",
                opciones: ["No usa servidores", "El proveedor gestiona automáticamente la infraestructura y escala según demanda", "Siempre gratuito", "Requiere aprovisionamiento manual"],
                correcta: "El proveedor gestiona automáticamente la infraestructura y escala según demanda",
                categoria: "Serverless",
                explicacion: "Serverless abstrae el servidor: el usuario sólo escribe código y paga por ejecución."
            },
            {
                texto: "¿Cuál es el propósito de CloudTrail en AWS?",
                opciones: ["Balanceo de carga", "Registro de auditoría de llamadas a la API", "Almacenamiento en bloque", "Entrega de contenido"],
                correcta: "Registro de auditoría de llamadas a la API",
                categoria: "Seguridad",
                explicacion: "CloudTrail graba acciones de usuarios y servicios para auditoría y cumplimiento."
            },
            {
                texto: "¿Qué servicio de Azure monitorea métricas y logs de recursos?",
                opciones: ["Azure Monitor", "Azure Advisor", "Azure Policy", "Azure Sentinel"],
                correcta: "Azure Monitor",
                categoria: "Monitoreo",
                explicacion: "Azure Monitor capta métricas, logs y diagnósticos para analizar rendimiento y salud de recursos."
            },
            {
                texto: "¿Qué característica de la nube mejora la resiliencia ante fallos regionales?",
                opciones: ["Multi‑tenant", "Zonal redundancy", "Auto‑scaling", "Serverless"],
                correcta: "Zonal redundancy",
                categoria: "Infraestructura",
                explicacion: "La redundancia zonal replica servicios en varias zonas de disponibilidad dentro de una región."
            },
            {
                texto: "¿Cuál es la principal ventaja de un diseño ‘microservicios’ en nube?",
                opciones: ["Mayor monoliticidad", "Escalado independiente de componentes", "Menor complejidad", "Sin necesidad de CI/CD"],
                correcta: "Escalado independiente de componentes",
                categoria: "Arquitectura",
                explicacion: "Los microservicios permiten desplegar y escalar individualmente cada servicio, mejorando agilidad."
            },
            {
                texto: "¿Qué servicio de AWS permite procesar flujos de datos en tiempo real?",
                opciones: ["Kinesis Data Streams", "S3", "Lambda", "DynamoDB"],
                correcta: "Kinesis Data Streams",
                categoria: "Analytics",
                explicacion: "Kinesis captura, procesa y analiza datos en tiempo real de fuentes diversas."
            },
            {
                texto: "¿Cuál es la utilidad de un servicio de gestión de configuración (p.ej. AWS Systems Manager)?",
                opciones: ["Gestionar contenedores", "Automatizar tareas de mantenimiento y parches", "Balancear carga", "Enviar correos"],
                correcta: "Automatizar tareas de mantenimiento y parches",
                categoria: "DevOps",
                explicacion: "Systems Manager permite ejecutar comandos, administrar parches y configurar instancias de forma centralizada."
            },
            {
                texto: "¿Qué servicio de Google Cloud facilita pipelines de ETL y procesamiento por lotes?",
                opciones: ["Dataflow", "BigQuery", "Pub/Sub", "Cloud Run"],
                correcta: "Dataflow",
                categoria: "Analytics",
                explicacion: "Dataflow ejecuta pipelines de datos en streaming y batch usando Apache Beam."
            },
            {
                texto: "¿Cuál es la función de un servicio de taguéo (etiquetas) en la nube?",
                opciones: ["Almacenar objetos", "Etiquetar recursos para organización y facturación", "Monitorizar logs", "Gestionar identidades"],
                correcta: "Etiquetar recursos para organización y facturación",
                categoria: "Costos",
                explicacion: "Las etiquetas permiten agrupar y rastrear costes asociados a proyectos o entornos."
            },
            {
                texto: "¿Qué servicio de AWS proporciona recomendaciones de optimización y mejores prácticas?",
                opciones: ["Trusted Advisor", "Inspector", "Shield", "WAF"],
                correcta: "Trusted Advisor",
                categoria: "Costos",
                explicacion: "AWS Trusted Advisor revisa recursos y ofrece sugerencias para seguridad, coste y rendimiento."
            },
            {
                texto: "¿Qué técnica se utiliza para cifrar datos en reposo en la nube?",
                opciones: ["TLS", "SSL", "Cifrado AES a nivel de disco o bucket", "VPN"],
                correcta: "Cifrado AES a nivel de disco o bucket",
                categoria: "Seguridad",
                explicacion: "Los proveedores aplican cifrado AES 256 de forma transparente a volúmenes y buckets."
            },
            {
                texto: "¿Cuál es el propósito de un servicio de gestión de secretos (p.ej. AWS Secrets Manager)?",
                opciones: ["Almacenar logs", "Gestionar credenciales y rotación automática", "Configurar redes", "Desplegar contenedores"],
                correcta: "Gestionar credenciales y rotación automática",
                categoria: "Seguridad",
                explicacion: "Secrets Manager centraliza secretos, automatiza rotación y controla acceso seguro."
            },
            {
                texto: "¿Qué significa ‘multi‑tenant’ en nube?",
                opciones: ["Varios inquilinos viven en la misma VM", "Un proveedor aloja múltiples clientes compartiendo infraestructura aislada", "Uso exclusivo de hardware", "Copia de seguridad automática"],
                correcta: "Un proveedor aloja múltiples clientes compartiendo infraestructura aislada",
                categoria: "General",
                explicacion: "Multi‑tenant permite eficiencia de recursos al aislar lógicamente a varios clientes en la misma plataforma."
            },
            {
                texto: "¿Cuál es el servicio de Google Cloud para orquestación de contenedores Kubernetes?",
                opciones: ["GKE", "Anthos", "App Engine", "Cloud Functions"],
                correcta: "GKE",
                categoria: "Contenedores",
                explicacion: "Google Kubernetes Engine es el servicio gestionado de Kubernetes en GCP."
            },
            {
                texto: "¿Qué componente gestiona el registro y la distribución de imágenes de contenedores?",
                opciones: ["Docker Hub", "Container Registry", "ECR", "Artifactory"],
                correcta: "ECR",
                categoria: "Contenedores",
                explicacion: "Elastic Container Registry (ECR) de AWS almacena y gestiona imágenes de Docker de forma segura."
            },
            {
                texto: "¿Qué servicio en Azure se usa para ingestión y análisis de telemetría en tiempo real?",
                opciones: ["Event Hubs", "Service Bus", "Storage Accounts", "Key Vault"],
                correcta: "Event Hubs",
                categoria: "Analytics",
                explicacion: "Event Hubs ingiere millones de eventos por segundo para análisis de telemetría y streaming."
            },
            {
                texto: "¿Cuál es la función de un ‘landing zone’ en la adopción de nube empresarial?",
                opciones: ["Desplegar VMs", "Establecer una arquitectura inicial segura y gobernada", "Monitorizar logs", "Balancear carga"],
                correcta: "Establecer una arquitectura inicial segura y gobernada",
                categoria: "Governance",
                explicacion: "Una landing zone define políticas, cuentas y redes base para un entorno de nube empresarial controlado."
            }

        ];

        // Variables de estado mejoradas
        let indiceActual = 0;
        const preguntaEl = document.getElementById("pregunta");
        const botones = document.querySelectorAll("#preguntaContainer .opcion");
        const siguienteBtn = document.getElementById("siguiente");
        const contadorPreguntas = document.createElement("div");
        contadorPreguntas.className = "contador-preguntas";
        document.getElementById("preguntaContainer").prepend(contadorPreguntas);

        // Función mejorada para cargar pregunta
        function cargarPregunta(indice) {
            const p = preguntas[indice];
            preguntaEl.textContent = p.texto;
            contadorPreguntas.textContent = `Pregunta ${indice + 1} de ${preguntas.length} | ${p.categoria}`;

            // Configuración avanzada de botones
            botones.forEach((btn, i) => {
                btn.textContent = p.opciones[i];
                btn.className = "opcion";
                btn.style.backgroundColor = "";
                btn.disabled = false;

                // Datos adicionales para cada opción
                btn.dataset.esCorrecta = (btn.textContent === p.correcta).toString();
                btn.dataset.explicacion = p.explicacion;

                // Limpiar clases y marcar la respuesta correcta
                btn.classList.remove("correcto");
                if (btn.textContent === p.correcta) {
                    btn.classList.add("correcto");
                }
            });

            // Actualizar estado del botón siguiente
            siguienteBtn.disabled = false;
            if (indice === preguntas.length - 1) {
                siguienteBtn.textContent = "Finalizar";
            } else {
                siguienteBtn.textContent = "➡️ Siguiente";
            }
        }

        // Sistema de pistas (opcional)
        function mostrarPista() {
            const pistaBtn = document.createElement("button");
            pistaBtn.id = "pista";
            pistaBtn.textContent = "💡 Mostrar pista";
            pistaBtn.className = "btn-pista";
            pistaBtn.addEventListener("click", () => {
                const explicacion = preguntas[indiceActual].explicacion;
                alert(`Pista: ${explicacion}`);
            });
            preguntaEl.insertAdjacentElement("afterend", pistaBtn);
        }

        // Efectos visuales mejorados
        function animarTransicion() {
            preguntaEl.style.animation = "none";
            void preguntaEl.offsetWidth; // Trigger reflow
            preguntaEl.style.animation = "fadeIn 0.5s ease";
        }

        // Manejador mejorado de siguiente pregunta
        siguienteBtn.addEventListener("click", () => {
            animarTransicion();
            indiceActual++;
            if (indiceActual < preguntas.length) {
                cargarPregunta(indiceActual);
                // Remover pista si existe
                const pistaBtn = document.getElementById("pista");
                if (pistaBtn) pistaBtn.remove();
                mostrarPista();
            } else {
                siguienteBtn.disabled = true;
                document.getElementById("terminar").click(); // Disparar evento de terminar
            }
        });

        // Inicialización mejorada
        function init() {
            cargarPregunta(indiceActual);
            mostrarPista();

            // Añadir animación inicial
            const container = document.querySelector("#preguntaContainer");
            container.style.animation = "slideIn 0.7s ease-out";

            // Cargar estilos dinámicos
            const style = document.createElement("style");
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .contador-preguntas {
                    color: #ff9900;
                    margin-bottom: 15px;
                    font-size: 0.9rem;
                    font-weight: bold;
                }
                .btn-pista {
                    background: transparent;
                    color: #00a1f1;
                    border: 1px solid #00a1f1;
                    margin: 10px 0;
                    padding: 5px 10px;
                    font-size: 0.8rem;
                }
                .btn-pista:hover {
                    background: rgba(0, 161, 241, 0.1);
                }
            `;
            document.head.appendChild(style);
        }

        // Iniciar la aplicación
        init();
    });
})();