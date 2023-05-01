const navbarMenu = document.querySelector("nav a");
const navbarLinks = document.querySelectorAll("nav a");


for(let i=0; i<navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    window.requestAnimationFrame(step);
  
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };
}

document.addEventListener('scroll', () => {
    let scroll = scrollY;
    if (scroll < 600)
        changeColor('about');
    else if (scroll >= 600 && scroll < 1200)
        changeColor("experience");
    else if (scroll >= 1200 && scroll < 1800) 
        changeColor("education");
    else if (scroll >= 1800 && scroll < 2400) 
        changeColor("skills");
    else if (scroll >= 2400 && scroll < 3000)
        changeColor("projects");
    else if (scroll >= 3000 && scroll < 3600) 
        changeColor("interests");
    else if (scroll >= 3600 && scroll < 4200)
        changeColor("awards");
    else if (scroll >= 4200 && scroll < 4800) 
        changeColor("contact");
})

const changeColor = (str) => {
    navbarLinks.forEach((ele)=>{
        if (ele.getAttribute('href') === '#' + str) 
            ele.classList.add('focus');
        else
            ele.classList.remove('focus');
    });
}