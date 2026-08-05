/* ===========================================================
   DONE. Creative Studio
   Main Frontend (GSAP + ScrollTrigger + Lenis)
=========================================================== */

/* ===================================
PROJECT DATABASE
=================================== */

const projects={

    vaarent:{

        title:"Vaarent もう一度だけ、あなたを抱きしめてもいい？",

        role:"Video Production • Editing • Color Grading",

        year:"2025",

        client:"@akmh_vaarent",

        video:"assets/videos/varen.mp4",

        story:`

As the video producer behind this project, DONE. Creative Studio crafted a vibrant personal branding video for Vaarent (@akmh_vaarent) from Akemihana. From concept to execution, we focused on capturing her playful J-pop idol energy and Japanese aesthetic, delivering a sleek, engaging promo reel tailored to build her personal brand and amplify her presence in the local pop-culture scene.

`,

        gallery:[

            "assets/images/vaarent1.jpg",

            "assets/images/vaarent2.jpg",

            "assets/images/vaarent3.jpg",

        ],

       drive:"https://www.instagram.com/reel/DQI6UIDEkZH/?igsh=MW5pc3FweXRyMWNuag=="

       

    },

   padel:{

        title:"Padel People",

        role:"Social Media Management • Editing",

        year:"2026",

        client:"Padel People",

        video:"assets/videos/padelpeople.mp4",

        story:`

DONE. Creative Studio stepped in as Social Media Manager for Padel People (@padelpeople.medan) to build a vibrant online presence. By producing a blend of high-energy Reels and sleek carousels, we showcase court culture, court features, and player excitement, ensuring the brand stays top of mind for fitness and sports enthusiasts across Medan.

`,

        gallery:[

            "assets/images/padel1.jpg",

            "assets/images/padel2.jpg",

            "assets/images/padel3.jpg"

        ],

      drive:"https://www.instagram.com/reel/DITaZjYvfak/?igsh=MTNza2dwajJ1ZXlrbA=="

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

    unlockd:{

        title:"UNLOCKD+ 'Unlock Your Premium Apps'",

        role:"Brand Identity • Web Development",

        year:"2026",

        client:"UNLOCKD+",

        video:"assets/videos/unlockd.mp4",

        story:`

As the Web Developer and Brand Identity lead for UNLOCKD+ (@unlockdplus), DONE. Creative Studio built a high-converting, user-friendly website designed to make digital product purchases seamless. Beyond web development, we crafted the core brand identity, including a sleek new logo and foundational visual guidelines, ensuring a cohesive and premium digital experience that drives real results.

`,

        gallery:[

            "assets/images/unlockd1.png",

            "assets/images/unlockd2.png",

            "assets/images/unlockd3.png"

        ],

       drive:"https://unlockd-plus.vercel.app/"

    }

};

const body = document.body;

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileClose = document.querySelector(".mobile-menu__close");
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

   if(mobileClose){

    mobileClose.addEventListener("click",()=>{

        mobileMenu.classList.remove("is-open");

        menuToggle.classList.remove("is-active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    });

}

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
   
    const fullPreview = document.querySelector("#fullPreview");

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

            fullPreview.href = project.drive;

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

   
