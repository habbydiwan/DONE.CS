const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

entry.target.classList.add("is-visible");

observer.unobserve(entry.target);

});

},

{

threshold:.15

}

);

document

.querySelectorAll("[data-reveal]")

.forEach(el=>observer.observe(el));
