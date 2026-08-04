function initWorks(){

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".work-card",{

        scrollTrigger:{

            trigger:".works",

            start:"top 70%"

        },

        y:80,

        opacity:0,

        stagger:.18,

        duration:1,

        ease:"power3.out"

    });

}