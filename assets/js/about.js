function initAbout() {

    gsap.registerPlugin(ScrollTrigger);

    revealAbout();

}

function revealAbout() {

    const tl = gsap.timeline({

        scrollTrigger: {
            trigger: ".about",
            start: "top 72%",
            once: true
        }

    });

    tl.from(".about .section-label", {

        y: 20,
        opacity: 0,
        duration: .5,
        ease: "power2.out"

    });

    tl.from(".about__title", {

        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out"

    }, "-=.2");

    tl.from(".about__text", {

        y: 40,
        opacity: 0,
        duration: .8

    }, "-=.6");

    tl.from(".about__photo", {

        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out"

    }, "-=.8");

    tl.from(".about__stats > div", {

        y: 30,
        opacity: 0,
        stagger: .15,
        duration: .45

    }, "-=.5");

    // Setelah stats muncul, jalankan counter
    tl.call(startCounters);

}

function startCounters() {

    const counters = document.querySelectorAll(".about__stats h3");

    counters.forEach(counter => {

        // Jangan animasi dua kali
        if (counter.dataset.done) return;
        counter.dataset.done = "true";

        const original = counter.textContent.trim();

        const target = parseInt(original.replace(/\D/g, ""));

        const suffix = original.replace(/[0-9]/g, "");

        const obj = {
            value: 0
        };

        gsap.to(obj, {

            value: target,
            duration: 1.4,
            ease: "power2.out",

            onUpdate() {

                counter.textContent =
                    Math.floor(obj.value) + suffix;

            }

        });

    });

}


