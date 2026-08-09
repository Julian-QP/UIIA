const perfil = {
    descripcion: "Soy estudiante de Ingeniería de Sistemas con experiencia en proyectos de frontend, automatización y consumo de APIs. Me apasiona aprender nuevas tecnologías y crear soluciones prácticas.",
    habilidades: ["HTML", "CSS", "JavaScript", "Git"]
};

const proyectos = [
    {
        titulo: "Desarrollo de paginas web",
        tech: "HTML, CSS, JS",
        desc: "El funcionamiento y mantenimiento de un sitio web, desde la estructura hasta la interactividad, especializado más en el front-end"
    },
    {
        titulo: "Desarrollo de aplicaciones movil",
        tech: "Flutter, Firebase",
        desc: "Desarrollo de aplicaciones web con Flutter y Firebase, creando una herramienta interactiva y funcional para los usuarios, ya sea del lado online y offline",
        galeria: [
            {
                src: "assets/flutter1.png",
                descripcion: " Maquetacion de la Pantalla de inicio de la app móvil con menú principal."
            },
            {
                src: "assets/flutter2.png",
                descripcion: "Interfaz de usuario y las funcionalidades de la app móvil, con un diseño intuitivo y fácil de usar."
            }
        ]
    },
    {
        titulo: "Diseñador de la pagina web Teatro Kusi Wasi",
        tech: "CSS, HTML, JS, Figma",
        desc: "Encargado de diseñar y maquetar la pagina web del teatro Kusi Wasi, utilizando Figma para el diseño de HTML, CSS y JS, pese que aun no esta publicada la pagina web, se encuentra en desarrollo y se espera que este lista pronto y agrade a todo el público",
        galeria: [
            {
                src: "assets/proyecto1.png",
                descripcion: "Diseño de la pagina de iniicio de la pagina web del teatro Kusi Wasi."
            },
            {
                src: "assets/proyecto2.png",
                descripcion: "Maquetación de la pagina web para el panel de usuario, donde se puede ver la información de los usuarios y sus datos."
            }
        ]
    }
];

const datosContacto = [
    {
        titulo: "Email",
        texto: "josequispepilares@gmail.com",
        url: "mailto:josequispepilares@gmail.com"
    },
    {
        titulo: "Email institucional",
        texto: "023100786k@uandina.edu.pe",
        url: "mailto:023100786k@uandina.edu.pe"
    },
    {
        titulo: "GitHub",
        texto: "github.com/Julian-QP",
        url: "https://github.com/Julian-QP"
    }
];

function renderizarPerfil() {
    const contenedor = document.querySelector(".sobre-mi-contenido");
    if (!contenedor) return;

    contenedor.innerHTML = `
        <p class="intro">${perfil.descripcion}</p>

        <div class="habilidades">
            <h3>Habilidades</h3>

            <ul>
                ${perfil.habilidades
                    .map((habilidad) => `<li>${habilidad}</li>`)
                    .join("")}
            </ul>
        </div>
    `;
}

function renderizarProyectos() {
    const contenedor = document.querySelector(".grid-proyectos");
    if (!contenedor) {
        console.error("No se encontró .grid-proyectos");
        return;
    }

    contenedor.innerHTML = "";

    proyectos.forEach((proyecto, index) => {
        const card = document.createElement("article");
        card.classList.add("proyecto");
        card.innerHTML = `
            <h3>${proyecto.titulo}</h3>
            <span class="tech">${proyecto.tech}</span>
            <p>${proyecto.desc}</p>
            ${proyecto.galeria ? `
                <button class="btn-galeria" type="button" data-indice="${index}">
                    Ver galería
                </button>
            ` : ""}
        `;
        contenedor.appendChild(card);
    });

    configurarGaleriaProyectos();
}

function configurarGaleriaProyectos() {
    const botones = document.querySelectorAll(".btn-galeria");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const index = Number(boton.dataset.indice);
            abrirGaleria(proyectos[index]);
        });
    });
}

function abrirGaleria(proyecto) {
    cerrarGaleria();

    const modal = document.createElement("div");
    modal.className = "galeria-modal";
    modal.innerHTML = `
        <div class="galeria-modal-contenido">
            <div class="galeria-modal-header">
                <div>
                    <h3>${proyecto.titulo}</h3>
                    <p class="galeria-modal-texto">Imágenes y detalles del proyecto</p>
                </div>
                <button class="galeria-modal-cerrar" type="button">&times;</button>
            </div>

            <div class="galeria-modal-grid">
                ${proyecto.galeria
                    .map(
                        (item) => `
                        <article class="galeria-modal-item">
                            <img src="${item.src}" alt="${item.descripcion}">
                            <p>${item.descripcion}</p>
                        </article>
                    `
                    )
                    .join("")}
            </div>
        </div>
    `;

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) cerrarGaleria();
    });

    modal.querySelector(".galeria-modal-cerrar").addEventListener("click", cerrarGaleria);

    document.body.appendChild(modal);
}

function cerrarGaleria() {
    const modalExistente = document.querySelector(".galeria-modal");
    if (modalExistente) modalExistente.remove();
}

function renderizarContacto() {
    const contenedor = document.querySelector(".contacto-grid");
    if (!contenedor) return;

    contenedor.innerHTML = datosContacto
        .map(
            (item) => `
            <article class="contacto-card">
                <h3>${item.titulo}</h3>
                <a href="${item.url}" target="_blank" rel="noreferrer">${item.texto}</a>
            </article>
        `
        )
        .join("");
}

function configurarNavegacion() {
    const enlaces = document.querySelectorAll(".navbar a");

    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            evento.preventDefault();
            const idDestino = enlace.getAttribute("href");
            const destino = document.querySelector(idDestino);
            if (destino) {
                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

function configurarBotonVerMas() {
    const boton = document.querySelector("#btn-ver-mas");
    if (!boton) return;

    boton.addEventListener("click", () => {
        const proyectosSection = document.querySelector("#proyectos");
        if (proyectosSection) {
            proyectosSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

function configurarBotonActividades() {
    const boton = document.querySelector("#btn-actividades");
    const panel = document.querySelector("#actividades-info");
    if (!boton || !panel) return;

    boton.addEventListener("click", () => {
        const visible = panel.classList.toggle("visible");
        boton.textContent = visible ? "Cerrar actividades" : "Otras actividades";

        if (visible) {
            panel.innerHTML = `
                <div class="section-subtitle">
                    <h3>Otras actividades</h3>
                    <p>Además del desarrollo web y estudiar , tengo pasatiempos que de una fomra me ayudan las cuales son: </p>
                </div>

                <div class="actividades-grid">
                    <article class="actividad-card">
                        <h4>Arte y Musica</h4>
                        <p>Toco instrumentos como el Violin, flauta y percusión , y en ocasiones dibujo</p>
                    </article>

                    <article class="actividad-card">
                        <h4>Electrónica básica</h4>
                        <p>Trabajo con circuitos simples y componentes electrónicos para complementar mi interés en tecnología.</p>
                    </article>

                    <article class="actividad-card">
                        <h4>Videojuegos</h4>
                        <p>Los juegos son una forma de despejar la mente, pero tambien al ver como el diseño y creatividad de los personajes o entorno son muy llamativos me ayuda a tener inspiracion y hacer tambien diseños nuevos.</p>
                    </article>
                </div>
            `;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderizarPerfil();
    renderizarProyectos();
    renderizarContacto();
    configurarNavegacion();
    configurarBotonVerMas();
    configurarBotonActividades();
});
