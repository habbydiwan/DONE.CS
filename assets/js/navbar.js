function initNavbar(){

    const navbar = document.querySelector(".navbar");
    const toggle = document.querySelector(".navbar__toggle");
    const body = document.body;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>80){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    });

    // Set initial state (fixes cases where page loads scrolled)
    if(window.scrollY > 80){
        navbar.classList.add("scrolled");
    }

    // Mobile menu toggle
    if(toggle){
        toggle.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("navbar--open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            body.classList.toggle("nav-open", isOpen);
        });
    }

    // Close menu when clicking a link (mobile)
    navbar.querySelectorAll("a[href^=\"#\"]").forEach((link) => {
        link.addEventListener("click", () => {
            if(navbar.classList.contains("navbar--open")){
                navbar.classList.remove("navbar--open");
                body.classList.remove("nav-open");
                if(toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Close on Escape
    window.addEventListener("keydown", (e) => {
        if(e.key !== "Escape") return;
        if(navbar.classList.contains("navbar--open")){
            navbar.classList.remove("navbar--open");
            body.classList.remove("nav-open");
            if(toggle) toggle.setAttribute("aria-expanded", "false");
        }
    });

    // Close on resize up to desktop
    window.addEventListener("resize", () => {
        if(window.innerWidth > 768 && navbar.classList.contains("navbar--open")){
            navbar.classList.remove("navbar--open");
            body.classList.remove("nav-open");
            if(toggle) toggle.setAttribute("aria-expanded", "false");
        }
    });

}
