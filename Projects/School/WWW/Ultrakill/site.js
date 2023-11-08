let siteText = [...document.querySelectorAll("p")];

let options = {
    startMargin: "-10%",
    threshold: 0.0
}

let observer = new IntersectionObserver(showItem, options)

function showItem(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.children[0].classList.add("active");
        }
    })
}

siteText.forEach(item => {
    observer.observe(item);
})