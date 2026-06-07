document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.choose-school__slider');
    const slides = Array.from(slider ? slider.querySelectorAll('.choose-school__card') : []);
    const dots = Array.from(document.querySelectorAll('.choose-school__dot'));
    if (!slider || !slides.length || !dots.length) return;

    // Create aria-live announcement region
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    const updateCurrentDot = (id) => {
        dots.forEach(dot => {
            if (dot.getAttribute('href') === `#${id}`) {
                dot.setAttribute('aria-current', 'true');
                liveRegion.textContent = `School option ${id.split('-').pop()} of ${slides.length} selected`;
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

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        const scrollAmount = slider.offsetWidth * 0.86;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    });

    // Click pagination dots to scroll
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href').substring(1);
            const targetSlide = document.getElementById(targetId);
            if (targetSlide) {
                targetSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                updateCurrentDot(targetId);
            }
        });
    });
});
