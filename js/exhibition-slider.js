document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.exhibition-section__slider');
    const prevButton = document.querySelector('.exhibition-section__button--prev');
    const nextButton = document.querySelector('.exhibition-section__button--next');
    if (!slider || !prevButton || !nextButton) return;

    // Create aria-live announcement region
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    const announceSlide = (direction) => {
        const scrollPos = slider.scrollLeft;
        const cardWidth = 320;
        const currentSlide = Math.round(scrollPos / cardWidth) + 1;
        const totalSlides = slider.querySelectorAll('.exhibition-section__card').length;
        liveRegion.textContent = `Exhibition highlight ${currentSlide} of ${totalSlides}, ${direction}`;
    };

    const step = Math.round(slider.offsetWidth * 0.8);
    const scrollToPrevious = () => {
        slider.scrollBy({ left: -step, behavior: 'smooth' });
        announceSlide('previous');
    };
    const scrollToNext = () => {
        slider.scrollBy({ left: step, behavior: 'smooth' });
        announceSlide('next');
    };

    prevButton.addEventListener('click', scrollToPrevious);
    nextButton.addEventListener('click', scrollToNext);

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollToPrevious();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollToNext();
        }
    });

    let autoPlayId = setInterval(scrollToNext, 6000);
    const pauseAutoPlay = () => {
        if (autoPlayId) {
            clearInterval(autoPlayId);
            autoPlayId = null;
        }
    };
    const resumeAutoPlay = () => {
        if (!autoPlayId) {
            autoPlayId = setInterval(scrollToNext, 6000);
        }
    };

    slider.addEventListener('mouseover', pauseAutoPlay);
    slider.addEventListener('mouseleave', resumeAutoPlay);
    slider.addEventListener('focusin', pauseAutoPlay);
    slider.addEventListener('focusout', resumeAutoPlay);
});
