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

    tl.to(".service-item", {

    opacity: 1,

    y: 0,

    stagger: .12,

    duration: .55,

    ease: "power3.out"

});

}