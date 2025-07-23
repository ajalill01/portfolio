// Custom smooth scroll function
function smoothScrollTo(targetId, duration = 800) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            smoothScrollTo(targetId, 500);
        }
    });
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-bar');
    window.scrollY > 50 ?
        navbar.style.backgroundColor = 'rgba(10,10,10,0.98)' :
        navbar.style.backgroundColor = 'rgba(10,10,10,0.95)';
});