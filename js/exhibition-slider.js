document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.exhibition-section__slider');
    const prevButton = document.querySelector('.exhibition-section__button--prev');
    const nextButton = document.querySelector('.exhibition-section__button--next');
    if (!slider || !prevButton || !nextButton) return;

    const step = Math.round(slider.offsetWidth * 0.8);
    const scrollToPrevious = () => slider.scrollBy({ left: -step, behavior: 'smooth' });
    const scrollToNext = () => slider.scrollBy({ left: step, behavior: 'smooth' });

    prevButton.addEventListener('click', scrollToPrevious);
    nextButton.addEventListener('click', scrollToNext);

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
