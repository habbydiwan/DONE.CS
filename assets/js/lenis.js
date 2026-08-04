function initLenis(){

    const lenis = new Lenis({

        duration:1.1,

        smoothWheel:true

    });

    function raf(time){

        lenis.raf(time);

        requestAnimationFrame(raf);

    }

    requestAnimationFrame(raf);

}