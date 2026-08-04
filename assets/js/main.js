/* ===========================================================
   DONE. Creative Studio
   Main Frontend (GSAP + ScrollTrigger + Lenis)
=========================================================== */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = document.querySelector(".mobile-menu__panel");
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

    window.addEventListener("scroll",updateHeaderState,{
        passive:true
    });

    window.addEventListener("resize",updateHeaderState);

}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

   window.addEventListener("resize", updateHeaderState);

const projectModal=document.querySelector("#projectModal");

const modalVideo=document.querySelector("#modalVideo");

const modalTitle=document.querySelector("#modalTitle");

const modalRole=document.querySelector("#modalRole");

const modalStory=document.querySelector("#modalStory");

const modalGallery=document.querySelector("#modalGallery");

const closeProject=document.querySelector("#closeProject");

document.querySelectorAll(".work-card").forEach(card=>{

card.addEventListener("click",()=>{

modalTitle.textContent=card.dataset.title;

modalRole.textContent=card.dataset.role;

modalStory.textContent=card.dataset.story;

modalVideo.src=card.dataset.video;

modalGallery.innerHTML="";

[
card.dataset.gallery1,
card.dataset.gallery2,
card.dataset.gallery3
].forEach(src=>{

if(!src)return;

const img=document.createElement("img");

img.src=src;

modalGallery.appendChild(img);

});

projectModal.classList.add("is-open");

document.body.classList.add("menu-open");

modalVideo.play();

});

});

closeProject.addEventListener("click",()=>{

projectModal.classList.remove("is-open");

document.body.classList.remove("menu-open");

modalVideo.pause();

});

document
.querySelector(".project-modal__backdrop")
.addEventListener("click",()=>{

closeProject.click();

});

window.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeProject.click();

}

});
