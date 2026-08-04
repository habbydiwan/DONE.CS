/* ===========================================================
   DONE. Creative Studio
   Main Frontend (GSAP + ScrollTrigger + Lenis)
=========================================================== */

/* ===================================
PROJECT DATABASE
=================================== */

const projects={

    farewell:{

        title:"Farewell Film",

        role:"Video Production • Editing • Color Grading",

        year:"2025",

        client:"Private Client",

        video:"assets/videos/farewell.mp4",

        story:`

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

`,

        gallery:[

            "assets/images/farewell-1.jpg",

            "assets/images/farewell-2.jpg",

            "assets/images/farewell-3.jpg"

        ]

    },

   wedding:{

        title:"Wedding Story",

        role:"Video Production • Editing • Color Grading",

        year:"2025",

        client:"Private Client",

        video:"assets/videos/farewell.mp4",

        story:`

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

`,

        gallery:[

            "assets/images/farewell-1.jpg",

            "assets/images/farewell-2.jpg",

            "assets/images/farewell-3.jpg"

        ]

    },

   coffee:{

        title:"Local Coffee Brand",

        role:"Social Media Management • Web Development",

        year:"2025",

        client:"Private Client",

        video:"assets/videos/farewell.mp4",

        story:`

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

`,

        gallery:[

            "assets/images/farewell-1.jpg",

            "assets/images/farewell-2.jpg",

            "assets/images/farewell-3.jpg"

        ]

    },

    restaurant:{

        title:"Restaurant Website",

        role:"UI Design • Web Development",

        year:"2025",

        client:"Restaurant",

        video:"assets/videos/restaurant.mp4",

        story:`

Lorem ipsum...

`,

        gallery:[

            "assets/images/r1.jpg",

            "assets/images/r2.jpg",

            "assets/images/r3.jpg"

        ]

    }

};

const body = document.body;

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const yearTarget = document.querySelector("#year");

function setYear() {
    if (yearTarget) yearTarget.textContent = String(new Date().getFullYear());
}

function getScrollY() {
    return window.scrollY || 0;
}

function updateHeaderState() {

    if (!header) return;

    const hero = document.querySelector(".hero");

    const heroHeight = hero ? hero.offsetHeight : window.innerHeight;

    const progress = Math.min(window.scrollY / heroHeight, 1);

    const blur = progress * 20;

    const opacity = progress * 0.78;

    header.style.backdropFilter = `blur(${blur}px)`;

    header.style.webkitBackdropFilter = `blur(${blur}px)`;

    header.style.background = `rgba(9,9,9,${opacity})`;

    header.style.borderBottomColor = `rgba(255,255,255,${progress * 0.08})`;

}

function lockBodyScroll(locked) {
    document.body.classList.toggle("menu-open", locked);
}

function initMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {

        const opened = mobileMenu.classList.toggle("is-open");

        menuToggle.classList.toggle("is-active", opened);

        menuToggle.setAttribute("aria-expanded", opened);

        document.body.classList.toggle("menu-open", opened);

    });

    mobileMenu.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click",()=>{

            mobileMenu.classList.remove("is-open");

            menuToggle.classList.remove("is-active");

            menuToggle.setAttribute("aria-expanded","false");

            document.body.classList.remove("menu-open");

        });

    });

}

function init(){

    setYear();

    updateHeaderState();

    initMenu();

   initProjectModal();

    window.addEventListener("scroll",updateHeaderState,{
        passive:true
    });

    window.addEventListener("resize",updateHeaderState);

}

function initProjectModal() {

    const projectModal = document.querySelector("#projectModal");

    const modalVideo = document.querySelector("#modalVideo");

    const modalTitle = document.querySelector("#modalTitle");

    const modalRole = document.querySelector("#modalRole");

    const modalYear = document.querySelector("#modalYear");

    const modalClient = document.querySelector("#modalClient");

    const modalStory = document.querySelector("#modalStory");

    const modalGallery = document.querySelector("#modalGallery");

    const closeProject = document.querySelector("#closeProject");

    if (
        !projectModal ||
        !modalVideo ||
        !closeProject
    ) return;

    document.querySelectorAll(".work-card").forEach(card => {

        card.addEventListener("click", () => {

            const project = projects[card.dataset.project];

            if (!project) return;

            modalTitle.textContent = project.title;

            modalRole.textContent = project.role;

            modalYear.textContent = project.year;

            modalClient.textContent = project.client;

            modalStory.innerHTML = "";

            project.story
                .trim()
                .split("\n\n")
                .forEach(text => {

                    const p = document.createElement("p");

                    p.textContent = text.trim();

                    modalStory.appendChild(p);

                });

            modalGallery.innerHTML = "";

            project.gallery.forEach(src => {

                const img = document.createElement("img");

                img.src = src;

                img.loading = "lazy";

                modalGallery.appendChild(img);

            });

            modalVideo.pause();

            modalVideo.src = project.video;

            modalVideo.load();

            modalVideo.play().catch(()=>{});

            projectModal.classList.add("is-open");

            body.classList.add("menu-open");

        });

    });

    function closeModal(){

        projectModal.classList.remove("is-open");

        body.classList.remove("menu-open");

        modalVideo.pause();

        modalVideo.currentTime = 0;

        modalVideo.removeAttribute("src");

        modalVideo.load();

    }

    closeProject.addEventListener("click", closeModal);

    projectModal
        .querySelector(".project-modal__backdrop")
        .addEventListener("click", closeModal);

    window.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            closeModal();

        }

    });

}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

   
