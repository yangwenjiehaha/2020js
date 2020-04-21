let ul = document.querySelector('.wrapper ul'),
    wrapper = document.querySelector('.wrapper'),
    left = document.querySelector('.scroll .left'),
    right = document.querySelector('.scroll .right'),
    start = 0;
console.log(right);
let timer = null;

function croll() {
    timer = setInterval(() => {
        start -= 460;
        if (start < -1840) {
            start = 0
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${start}px)`;
            let h = ul.offsetTop;
            start = -460;
        }
        ul.style.transform = `translateX(${start}px)`;
        ul.style.transition = 'all .5s';
    }, 3000);
}
croll();
wrapper.onmouseenter = function () {
    clearInterval(timer);
}
wrapper.onmouseleave = function () {
    croll();
}
left.onclick = function () {
    if (start === 0) {
        start = -1840;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${start}px)`;
        let h = ul.offsetTop;
        start=-1840;
    }
    if (start < 0) {
        start += 460;
        if (start > 1840) {
            start = -1840;
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${start}px)`;
            let r = ul.offsetTop;
            start += 460;
        }
        ul.style.transform = `translateX(${start}px)`;
        ul.style.transition = 'all .5s';
    }

}
right.onclick = function () {
    start -= 460;
    if (start < -1840) {
        start = 0;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${start}px)`;
        let r = ul.offsetTop;
        start = -460;
    }
    ul.style.transform = `translateX(${start}px)`;
    ul.style.transition = 'all .5s';
}