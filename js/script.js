/* =========================================================
   CONFIGURACIÓN
========================================================= */

/*
    FECHA DEL BAUTIZO

    Formato:
    Año, Mes, Día, Hora, Minuto

    Octubre = 9
    porque JavaScript empieza los meses en 0.
*/

const EVENT_DATE =
    new Date(2026, 9, 24, 12, 0, 0);


/* =========================================================
   ELEMENTOS
========================================================= */

const navbar =
    document.getElementById("navbar");

const menuToggle =
    document.getElementById("menuToggle");

const navigation =
    document.getElementById("navigation");

const progressBar =
    document.getElementById("scrollProgress");

const particlesContainer =
    document.getElementById("particles");

const cursorGlow =
    document.querySelector(".cursor-glow");


/* =========================================================
   MENÚ MOBILE
========================================================= */

if (menuToggle && navigation) {

    menuToggle.addEventListener(
        "click",
        () => {

            navigation.classList.toggle("open");

            menuToggle.classList.toggle("active");

        }
    );


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   NAVBAR
========================================================= */

function updateNavbar() {

    if (window.scrollY > 60) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


/* =========================================================
   BARRA DE PROGRESO
========================================================= */

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    if (pageHeight <= 0) {

        progressBar.style.width = "0%";

        return;

    }

    const percentage =
        (scrollTop / pageHeight) * 100;

    progressBar.style.width =
        `${percentage}%`;

}


/* =========================================================
   PARALLAX
========================================================= */

const parallaxElements =
    document.querySelectorAll(
        ".parallax"
    );


function updateParallax() {

    const scroll =
        window.scrollY;


    parallaxElements.forEach(
        element => {

            const speed =
                parseFloat(
                    element.dataset.speed || 0.1
                );


            const movement =
                scroll * speed;


            element.style.transform =
                `translateY(${movement}px)`;

        }
    );

}


/* =========================================================
   SCROLL GENERAL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        updateNavbar();

        updateScrollProgress();

        updateParallax();

    },
    {
        passive: true
    }
);


/* =========================================================
   ANIMACIONES REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   NAVEGACIÓN ACTIVA
========================================================= */

const sections =
    document.querySelectorAll(
        ".section"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


sections.forEach(
    section => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   CONTADOR REGRESIVO
========================================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


function addLeadingZero(number) {

    return String(number)
        .padStart(2, "0");

}


function updateCountdown() {

    const now =
        new Date();


    const difference =
        EVENT_DATE.getTime()
        - now.getTime();


    /*
        Si ya llegó la fecha.
    */

    if (difference <= 0) {

        daysElement.textContent =
            "00";

        hoursElement.textContent =
            "00";

        minutesElement.textContent =
            "00";

        secondsElement.textContent =
            "00";

        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400)
            / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );


    const seconds =
        totalSeconds % 60;


    daysElement.textContent =
        addLeadingZero(days);


    hoursElement.textContent =
        addLeadingZero(hours);


    minutesElement.textContent =
        addLeadingZero(minutes);


    secondsElement.textContent =
        addLeadingZero(seconds);

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   CREAR PARTICULAS
========================================================= */

function createParticles(
    amount = 70
) {

    if (!particlesContainer) {
        return;
    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.classList.add(
            "particle"
        );


        const left =
            Math.random() * 100;


        const duration =
            8 +
            Math.random() * 15;


        const delay =
            Math.random() * 15;


        const size =
            1 +
            Math.random() * 3;


        particle.style.left =
            `${left}%`;


        particle.style.width =
            `${size}px`;


        particle.style.height =
            `${size}px`;


        particle.style.animationDuration =
            `${duration}s`;


        particle.style.animationDelay =
            `-${delay}s`;


        particlesContainer.appendChild(
            particle
        );

    }

}


createParticles(80);


/* =========================================================
   CURSOR GLOW
========================================================= */

if (
    cursorGlow &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   EFECTO HOVER GLASS
========================================================= */

const glassCards =
    document.querySelectorAll(
        ".glass-card"
    );


glassCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX
                    - rect.left;


                const y =
                    event.clientY
                    - rect.top;


                const rotateX =
                    ((y / rect.height) - .5)
                    * -4;


                const rotateY =
                    ((x / rect.width) - .5)
                    * 4;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }
            );

        }
    );


/* =========================================================
   ANIMACIÓN DE ENTRADA INICIAL
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

        updateNavbar();

        updateScrollProgress();

        updateParallax();

    }
);