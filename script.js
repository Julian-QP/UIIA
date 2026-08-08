/* =========================================================
   script.js
   Portafolio — Jose Julian
   Ingeniería de Sistemas
   ========================================================= */


/* =========================================================
   1. DATOS DE LOS PROYECTOS
   ========================================================= */

const proyectos = [
    {
        titulo: "Sistema de Inventario",

        tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],

        desc:
            "Sistema CRUD para gestionar productos, permitiendo " +
            "crear, editar, eliminar y consultar información " +
            "utilizando almacenamiento local.",

        categoria: "Desarrollo Web",

        estado: "Completado",

        github: "#",

        demo: "#"
    },

    {
        titulo: "Diseño de páginas web",

        tech: ["PHP", "CSS", "JavaScript"],

        desc:
            "Diseño y desarrollo de interfaces web adaptadas " +
            "a las necesidades del usuario, priorizando la " +
            "usabilidad, estructura visual y experiencia de navegación.",

        categoria: "Desarrollo Web",

        estado: "En desarrollo",

        github: "#",

        demo: "#"
    },

    {
        titulo: "Dashboard generador de listas",

        tech: ["Firebase", "Flutter", "Google AI"],

        desc:
            "Aplicativo multiplataforma con funcionamiento online " +
            "y offline, sincronización de datos mediante Firebase " +
            "e integración de herramientas de inteligencia artificial.",

        categoria: "Aplicaciones",

        estado: "En desarrollo",

        github: "#",

        demo: "#"
    }
];


/* =========================================================
   2. ELEMENTOS DEL DOM
   ========================================================= */

const contenedorProyectos =
    document.getElementById("lista-proyectos");

const enlacesNavegacion =
    document.querySelectorAll(".nav-link");


/* =========================================================
   3. RENDERIZAR PROYECTOS
   ========================================================= */

function renderizarProyectos() {

    if (!contenedorProyectos) {
        console.error(
            "No se encontró el contenedor de proyectos."
        );

        return;
    }


    // Limpiar contenido anterior

    contenedorProyectos.innerHTML = "";


    // Generar tarjetas

    proyectos.forEach((proyecto, indice) => {

        const card =
            document.createElement("article");


        card.classList.add("proyecto");


        // Crear etiquetas de tecnologías

        const tecnologias = proyecto.tech
            .map(
                tecnologia =>
                    `<span>${tecnologia}</span>`
            )
            .join("");


        card.innerHTML = `

            <div class="proyecto-header">

                <span class="proyecto-numero">
                    ${String(indice + 1).padStart(2, "0")}
                </span>

                <span class="proyecto-estado">
                    ${proyecto.estado}
                </span>

            </div>


            <h3>
                ${proyecto.titulo}
            </h3>


            <span class="proyecto-categoria">
                ${proyecto.categoria}
            </span>


            <p class="proyecto-descripcion">
                ${proyecto.desc}
            </p>


            <div class="proyecto-tecnologias">
                ${tecnologias}
            </div>


            <div class="proyecto-links">

                <a
                    href="${proyecto.github}"
                    class="proyecto-link"
                    target="_blank"
                    rel="noopener noreferrer">

                    GitHub

                </a>


                <a
                    href="${proyecto.demo}"
                    class="proyecto-link proyecto-link-primary"
                    target="_blank"
                    rel="noopener noreferrer">

                    Ver proyecto →

                </a>

            </div>

        `;


        contenedorProyectos.appendChild(card);

    });
}


/* =========================================================
   4. NAVEGACIÓN SUAVE
   ========================================================= */

function configurarNavegacion() {

    enlacesNavegacion.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            (evento) => {

                const idDestino =
                    enlace.getAttribute("href");


                // Verificar que sea un enlace interno

                if (
                    !idDestino ||
                    !idDestino.startsWith("#")
                ) {
                    return;
                }


                const destino =
                    document.querySelector(idDestino);


                if (!destino) {
                    return;
                }


                evento.preventDefault();


                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                // Actualizar URL

                history.pushState(
                    null,
                    "",
                    idDestino
                );

            }
        );

    });
}


/* =========================================================
   5. ANIMACIONES AL HACER SCROLL
   ========================================================= */

function configurarAnimaciones() {

    const elementos =
        document.querySelectorAll(
            ".section-header, " +
            ".about-content, " +
            ".about-info, " +
            ".skill-card, " +
            ".timeline-item, " +
            ".proyecto, " +
            ".service-card"
        );


    if (!elementos.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entradas, observador) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }


                    entrada.target.classList.add(
                        "visible"
                    );


                    observador.unobserve(
                        entrada.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    elementos.forEach((elemento) => {

        elemento.classList.add(
            "animate-on-scroll"
        );

        observer.observe(elemento);

    });
}


/* =========================================================
   6. AÑO AUTOMÁTICO DEL FOOTER
   ========================================================= */

function actualizarAnio() {

    const textosFooter =
        document.querySelectorAll(
            ".footer-bottom p"
        );


    if (!textosFooter.length) {
        return;
    }


    const anio =
        new Date().getFullYear();


    textosFooter.forEach((texto) => {

        if (
            texto.textContent.includes("©")
        ) {

            texto.textContent =
                texto.textContent.replace(
                    /\d{4}/,
                    anio
                );

        }

    });
}


/* =========================================================
   7. BOTÓN DE EMAIL
   ========================================================= */

function configurarContacto() {

    const enlacesEmail =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    enlacesEmail.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            () => {

                console.log(
                    "Abriendo cliente de correo..."
                );

            }
        );

    });
}


/* =========================================================
   8. INDICADOR DE SECCIÓN ACTIVA
   ========================================================= */

function configurarSeccionActiva() {

    const secciones =
        document.querySelectorAll(
            "main section[id]"
        );


    if (!secciones.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach((entrada) => {

                    if (!entrada.isIntersecting) {
                        return;
                    }


                    const id =
                        entrada.target.id;


                    enlacesNavegacion.forEach(
                        (enlace) => {

                            enlace.classList.remove(
                                "active"
                            );


                            if (
                                enlace.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                enlace.classList.add(
                                    "active"
                                );

                            }

                        }
                    );

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px"
            }
        );


    secciones.forEach((seccion) => {

        observer.observe(seccion);

    });
}


/* =========================================================
   9. PROTECCIÓN DE ENLACES VACÍOS
   ========================================================= */

function configurarEnlacesPendientes() {

    const enlaces =
        document.querySelectorAll(
            'a[href="#"]'
        );


    enlaces.forEach((enlace) => {

        enlace.addEventListener(
            "click",
            (evento) => {

                evento.preventDefault();

                console.info(
                    "Este enlace todavía no tiene una URL configurada."
                );

            }
        );

    });
}


/* =========================================================
   10. INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderizarProyectos();

        configurarNavegacion();

        configurarAnimaciones();

        configurarSeccionActiva();

        actualizarAnio();

        configurarContacto();

        configurarEnlacesPendientes();

        console.log(
            "Portafolio de Jose Julian iniciado correctamente."
        );

    }
);
