/* ===========================================================
   DONE. Creative Studio
   Main Frontend (GSAP + ScrollTrigger + Lenis)
=========================================================== */

document.documentElement.classList.add("js");
document.body.classList.add("is-loading");

const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

const header = document.querySelector(".site-header");
const loader = document.querySelector(".loader");
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
    const y = getScrollY();
    header?.classList.toggle("is-scrolled", y > 24);
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

function initLoader() {
    if (!loader) {
        document.body.classList.remove("is-loading");
        return;
    }
    if (prefersReducedMotion || typeof gsap === "undefined") {
        loader.style.display = "none";
        document.body.classList.remove("is-loading");
        return;
    }

    const logo = loader.querySelector(".loader__logo");
    const tagline = loader.querySelector(".loader__tagline");

    const tl = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    tl.set([logo, tagline], { autoAlpha: 0, y: 14, filter: "blur(10px)" })
        .to(logo, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 0.15)
        .to(tagline, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.75 }, 0.35)
        .to({}, { duration: 0.35 }) // beat
        .to([logo, tagline], { autoAlpha: 0, y: -10, filter: "blur(8px)", duration: 0.6 }, "+=0.35")
        .to(loader, { autoAlpha: 0, duration: 0.55, ease: "power2.inOut" }, "-=0.15")
        .set(loader, { display: "none" })
        .add(() => {

    document.body.classList.remove("is-loading");

    ScrollTrigger.refresh();

});
}

function initScrollAnimations() {

    if (prefersReducedMotion) {

        document
            .querySelectorAll("[data-animate], .reveal-item")
            .forEach(el => el.classList.add("is-visible"));

        return;

    }

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray("[data-animate]").forEach((element, index) => {

        gsap.set(element, {

            autoAlpha: 0,

            y: 32

        });

        gsap.to(element, {

            autoAlpha: 1,

            y: 0,

            duration: .9,

            ease: "power3.out",

            scrollTrigger: {

                trigger: element,

                start: "top 84%",

                once: true

            }

        });

    });

    gsap.utils.toArray(".reveal-item").forEach((element) => {

        gsap.set(element, {

            autoAlpha: 0,

            y: 28

        });

        gsap.to(element, {

            autoAlpha: 1,

            y: 0,

            duration: .75,

            ease: "power3.out",

            scrollTrigger: {

                trigger: element,

                start: "top 88%",

                once: true

            }

        });

    });

    document.querySelectorAll(".stat-card strong").forEach((el) => {

        const raw = (el.textContent || "").trim();

        const digits = parseInt(raw.replace(/\D/g, ""), 10);

        if (!Number.isFinite(digits)) return;

        const suffix = raw.replace(/[0-9]/g, "");

        ScrollTrigger.create({

            trigger: el,

            start: "top 85%",

            once: true,

            onEnter: () => {

                const obj = { value: 0 };

                gsap.to(obj, {

                    value: digits,

                    duration: 1.2,

                    ease: "power2.out",

                    onUpdate: () => {

                        el.textContent = Math.floor(obj.value) + suffix;

                    }

                });

            }

        });

    });

    document.querySelectorAll("section[id]").forEach((section) => {

        const id = section.id;

        const links = document.querySelectorAll(

            `.desktop-nav a[href="#${id}"], .mobile-menu a[href="#${id}"]`

        );

        ScrollTrigger.create({

            trigger: section,

            start: "top center",

            end: "bottom center",

            onToggle: self => {

                links.forEach(link => {

                    link.classList.toggle("is-active", self.isActive);

                });

            }

        });

    });

}

function init() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    setYear();
    updateHeaderState();
    initLoader();
    initMenu();
    initScrollAnimations();

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
