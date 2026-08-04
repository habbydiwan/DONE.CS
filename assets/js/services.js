function initServices() {

    const tl = gsap.timeline({

        scrollTrigger: {

    trigger: ".services",

    start: "top bottom",

    end: "bottom top",

    once: true

}

    });

    tl.from(".services .section-label", {

        y: 20,

        opacity: 0,

        duration: .5,

        ease: "power2.out"

    });

    tl.from(".services__heading", {

        y: 60,

        opacity: 0,

        duration: .8,
        ease: "power3.out"
 
    }, "-=.2");

    // Smooth reveal for the list items
    tl.from(".service-item", {
        opacity: 0,
        y: 24,
        stagger: .10,
        duration: .55,
        ease: "power3.out"
    }, "-=.15");

}
