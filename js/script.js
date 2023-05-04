const navbarLinks = document.querySelectorAll("nav a");
const elements = new Array(navbarLinks.length);

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
    elements[i] = document.querySelector(navbarLinks[i].getAttribute('href'));
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
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
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
    navbarLinks.forEach((ele) => {
        if (ele.getAttribute('href') === '#' + str)
            ele.classList.add('focus');
        else
            ele.classList.remove('focus');
    });
}

const form = document.querySelector("form");
const submitBtn = document.querySelector('input[type="submit"]');
document.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector("#message").value;
    if (name === '') window.alert("Enter your name");
    else if (email === '') window.alert("Enter your email");
    else if (message === '') window.alert("You have not entered any message");
    else {
        makeApiCall({ name: name, email: email, message: message });
    }
})

function makeApiCall(obj) {
    submitBtn.value = 'Wait!';
    submitBtn.disabled = true;
    const requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    const api = `https://script.google.com/macros/s/AKfycbwIXEggragUFPOq3ZiMhWIDcMOFgwe-By2Rua_5g4mJ_fE8qt1sxFT5kKl_Al_hRlGP/exec?name=${obj.name}&email=${obj.email}&message=${obj.message}`
    fetch(api, requestOptions)
        .then(response => response.text())
        .then((result) => {
            alert("Submitted Successfully!")
            form.reset();
            submitBtn.value = 'Submit';
        })
        .catch((error) => {
            submitBtn.value = 'Retry';
            alert('Some error occured while sending response. Try again later!')
        })
        .finally(()=>{
            submitBtn.disabled = false;
        });

}

// Making responsive navbar
const toggleBtn = document.getElementById('toggle-btn');
const navBar = document.querySelector('nav');
const navBarTemp = document.querySelector('.nav-temp');
let state = 'close';
toggleBtn.addEventListener('click', () => {
    if (state === 'close') {
        navBarTemp.style.display = "none";
        navBar.style.height = "max-content";
        toggleBtn.classList.remove('fa-bars');
        toggleBtn.classList.add('fa-close');
        state = 'open';
    }
    else {
        navBar.style.height = "0px";
        navBarTemp.style.display = "flex";
        toggleBtn.classList.remove('fa-close');
        toggleBtn.classList.add('fa-bars');
        state = 'close';
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navBar.style.height = "100vh";
        navBar.style.width = 'max-content';
    }
    else {
        navBarTemp.style.display = 'flex';
        if (state === 'close')
            navBar.style.height = '0px';
        else
            navBar.style.height = 'max-content'
        navBar.style.width = '100%';
    }
})