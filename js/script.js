const navbarLinks = document.querySelectorAll("nav a");
const elements = new Array(navbarLinks.length);

for(let i=0; i<navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
  elements[i] = document.querySelector( navbarLinks[i].getAttribute('href'));
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
    let scroll = scrollY + 200;
    if (scroll < elements[1].offsetTop)
        changeColor('about');
    else if (scroll < elements[2].offsetTop)
        changeColor("experience");
    else if (scroll < elements[3].offsetTop) 
        changeColor("education");
    else if (scroll < elements[4].offsetTop) 
        changeColor("skills");
    else if (scroll < elements[5].offsetTop)
        changeColor("projects");
    else if (scroll < elements[6].offsetTop) 
        changeColor("interests");
    else if (scroll < elements[7].offsetTop)
        changeColor("awards");
    else
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