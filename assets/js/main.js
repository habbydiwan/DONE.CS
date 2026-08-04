/* ===========================================================
   DONE. Creative Studio
   Main Frontend (GSAP + ScrollTrigger + Lenis)
=========================================================== */

const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = document.querySelector(".mobile-menu__panel");
const yearTarget = document.querySelector("#year");

let menuTl = null;

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

function closeMenu() {
    if (!menuTl) return;
    menuTl.reverse();
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.classList.remove("is-active");
    lockBodyScroll(false);
}

function openMenu() {
    if (!menuTl) return;
    menuTl.play(0);
    menuToggle?.setAttribute("aria-expanded", "true");
    menuToggle?.classList.add("is-active");
    lockBodyScroll(true);
}

function toggleMenu() {
    if (!menuTl) return;
    const isOpen = menuTl.progress() > 0 && !menuTl.reversed();
    if (isOpen) closeMenu();
    else openMenu();
}

function initMenu() {
    if (!menuToggle || !mobileMenu || !mobileMenuPanel) return;

    // Start from hidden state, then animate in/out.
    gsap.set(mobileMenu, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(mobileMenuPanel, { y: 18, filter: "blur(10px)" });

    menuTl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.65, ease: "power3.out" },
        onReverseComplete() {
            gsap.set(mobileMenu, { pointerEvents: "none" });
        },
        onStart() {
            gsap.set(mobileMenu, { pointerEvents: "auto" });
        }
    });

    menuTl
        .to(mobileMenu, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, 0)
        .to(mobileMenuPanel, { y: 0, filter: "blur(0px)" }, 0)
        .fromTo(
            mobileMenuPanel.querySelectorAll("a"),
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.45, ease: "power2.out" },
            0.06
        );

    menuToggle.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) closeMenu();
    });
}

function init() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    setYear();
    updateHeaderState();
    initMenu();

   ScrollTrigger.refresh();

    if (!lenis) {
    window.addEventListener("scroll", updateHeaderState, {
        passive: true
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
