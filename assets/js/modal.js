let modalTimeline;

function initModal(){

    const modal=document.querySelector(".project-modal");

    const wrapper=document.querySelector(".project-modal__wrapper");

    const cards=document.querySelectorAll(".work-card");

    const close=document.querySelector(".project-modal__close");

    const overlay=document.querySelector(".project-modal__overlay");

    const title=document.querySelector(".modal-title");

    const category=document.querySelector(".modal-category");

    const description=document.querySelector(".modal-description");

    const preview=document.querySelector(".modal-preview");

    let isOpen=false;

    modalTimeline=gsap.timeline({

        paused:true

    });

    modalTimeline

    .set(modal,{

        visibility:"visible"

    })

    .to(modal,{

        opacity:1,

        duration:.25

    })

    .from(wrapper,{

        y:60,

        opacity:0,

        duration:.7,

        ease:"power3.out"

    },"-=.1")

    .from(category,{

        y:16,

        opacity:0,

        duration:.35

    },"-=.45")

    .from(title,{

        y:24,

        opacity:0,

        duration:.45

    },"-=.25")

    .from(description,{

        y:18,

        opacity:0,

        duration:.4

    },"-=.3")

    .from(preview,{

        scale:.96,

        opacity:0,

        duration:.55

    },"<");



    cards.forEach((card,index)=>{

        card.addEventListener("click",()=>{

            if(isOpen) return;

            isOpen=true;

            const project=projects[index];

            title.textContent=project.title;

            category.textContent=project.category;

            description.textContent=project.description;

            preview.textContent=project.preview;

            document.body.style.overflow="hidden";

            modal.classList.add("active");

            modalTimeline.restart();

        });

    });



    function closeModal(){

        if(!isOpen) return;

        isOpen=false;

        gsap.to(wrapper,{

            y:40,

            opacity:0,

            duration:.35,

            ease:"power2.in"

        });

        gsap.to(modal,{

            opacity:0,

            duration:.25,

            delay:.1,

            onComplete(){

                modal.classList.remove("active");

                modal.style.visibility="hidden";

                document.body.style.overflow="";

                gsap.set(wrapper,{

                    clearProps:"all"

                });

            }

        });

    }

    close.addEventListener("click",closeModal);

    overlay.addEventListener("click",closeModal);

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeModal();

        }

    });

}