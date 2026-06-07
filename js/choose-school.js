document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.choose-school__slider');
    const slides = Array.from(slider ? slider.querySelectorAll('.choose-school__card') : []);
    const dots = Array.from(document.querySelectorAll('.choose-school__dot'));
    if (!slider || !slides.length || !dots.length) return;

    const updateCurrentDot = (id) => {
        dots.forEach(dot => {
            if (dot.getAttribute('href') === `#${id}`) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                updateCurrentDot(entry.target.id);
            }
        });
    }, {
        root: slider,
        threshold: [0.55]
    });

    slides.forEach(slide => observer.observe(slide));
});
