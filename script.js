/* =====================================================
   SCRIPT.JS
   Interações e animações do site
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- MENU MOBILE ---------- */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            const aberto = navLinks.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );
        });

        // Fecha o menu ao clicar em um link
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    /* ---------- ANIMAÇÃO AO ROLAR ---------- */

    const elementos = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);

                }

            });
        },
        {
            threshold: 0.12
        }
    );

    elementos.forEach(elemento => {
        observer.observe(elemento);
    });


    /* ---------- MENU ATIVO CONFORME A SEÇÃO ---------- */

    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const id = entry.target.getAttribute("id");

                    links.forEach(link => {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") === `#${id}`
                        ) {
                            link.classList.add("active");
                        }
                    });
                }
            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ---------- BOTÃO VOLTAR AO TOPO ---------- */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    /* ---------- EFEITO SUAVE NOS LINKS ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const destino = link.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ---------- ANO AUTOMÁTICO NO RODAPÉ ---------- */

    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ---------- EFEITO DE DIGITAÇÃO ---------- */

    const typingElement = document.querySelector(".typing");

    if (typingElement) {

        const textos = [
            "Inteligência Artificial",
            "Programação",
            "Impressão 3D",
            "Desenvolvimento Web"
        ];

        let textoAtual = 0;
        let caractereAtual = 0;
        let apagando = false;

        function digitar() {

            const texto = textos[textoAtual];

            if (!apagando) {

                caractereAtual++;

                typingElement.textContent =
                    texto.substring(0, caractereAtual);

                if (caractereAtual === texto.length) {

                    apagando = true;

                    setTimeout(digitar, 1800);
                    return;
                }

            } else {

                caractereAtual--;

                typingElement.textContent =
                    texto.substring(0, caractereAtual);

                if (caractereAtual === 0) {

                    apagando = false;

                    textoAtual =
                        (textoAtual + 1) % textos.length;
                }
            }

            setTimeout(
                digitar,
                apagando ? 45 : 75
            );
        }

        digitar();
    }


    /* ---------- LOG NO CONSOLE ---------- */

    console.log(
        "🚀 Site carregado com sucesso!"
    );

    console.log(
        "Projeto de tecnologia, IA, programação e impressão 3D."
    );

});
