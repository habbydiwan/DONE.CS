function initLoader(){

    const tl = gsap.timeline();

    tl.from(".loader__logo",{

        y:40,

        opacity:0,

        duration:.8,

        ease:"power3.out"

    });

    tl.from(".loader p",{

        opacity:0,

        y:20,

        duration:.5

    },"-=.4");

    tl.to(".loader",{

        opacity:0,

        duration:.8,

        delay:.6,

        pointerEvents:"none"

    });


    tl.from(".hero__content>*",{

        y:40,

        opacity:0,

        stagger:.12,

        duration:.8,

        ease:"power3.out"

    },"-=.5");

    tl.call(() => {

    ScrollTrigger.refresh(true);

    console.log("ScrollTrigger Refreshed");

});

}