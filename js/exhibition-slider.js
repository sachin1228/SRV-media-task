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

    const cards = Array.from(slider.querySelectorAll('.exhibition-section__card'));
    const totalSlides = cards.length;

    const getActiveIndex = () => {
        const viewportLeft = slider.scrollLeft;
        const viewportRight = viewportLeft + slider.clientWidth;
        let activeIndex = 0;
        let maxVisibleWidth = -1;

        cards.forEach((card, index) => {
            const cardLeft = card.offsetLeft;
            const cardRight = cardLeft + card.clientWidth;
            const visibleWidth = Math.max(0, Math.min(cardRight, viewportRight) - Math.max(cardLeft, viewportLeft));

            if (visibleWidth > maxVisibleWidth) {
                maxVisibleWidth = visibleWidth;
                activeIndex = index;
            }
        });

        return activeIndex;
    };

    const scrollToIndex = (index) => {
        const card = cards[index];
        if (!card) return;

        card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    };

    const announceSlide = (direction) => {
        const currentSlide = getActiveIndex() + 1;
        liveRegion.textContent = `Exhibition highlight ${currentSlide} of ${totalSlides}, ${direction}`;
    };

    const scrollToPrevious = () => {
        const currentIndex = getActiveIndex();
        scrollToIndex(Math.max(0, currentIndex - 1));
        announceSlide('previous');
    };

    const scrollToNext = () => {
        const currentIndex = getActiveIndex();
        scrollToIndex(Math.min(totalSlides - 1, currentIndex + 1));
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
});
