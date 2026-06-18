(function () {
    var viewport = document.querySelector('.exhibition-section__slider');
    var track = document.getElementById('exhibitionTrack');
    var prevBtn = document.getElementById('exhibitionPrevBtn');
    var nextBtn = document.getElementById('exhibitionNextBtn');

    if (!viewport || !track || !prevBtn || !nextBtn) return;

    var cards = Array.prototype.slice.call(track.children);
    var total = cards.length;
    var currentIndex = 0;
    var autoplayDelay = 3500;
    var autoplayTimer = null;
    var gap = 16;

    function getStep() {
        return cards[0].getBoundingClientRect().width + gap;
    }

    function getVisibleWidth() {
        var styles = getComputedStyle(viewport);
        var paddingLeft = parseFloat(styles.paddingLeft) || 0;
        var paddingRight = parseFloat(styles.paddingRight) || 0;

        return viewport.clientWidth - paddingLeft - paddingRight;
    }

    function getMaxOffset() {
        return Math.max(0, track.scrollWidth - getVisibleWidth());
    }

    function getMaxIndex() {
        return Math.ceil(getMaxOffset() / getStep());
    }

    function updateButtons() {
        var maxIndex = getMaxIndex();

        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    function goTo(index, opts) {
        var maxIndex = getMaxIndex();
        var loop = opts && opts.loop;

        if (index > maxIndex) {
            index = loop ? 0 : maxIndex;
        } else if (index < 0) {
            index = loop ? maxIndex : 0;
        }

        currentIndex = index;

        var offset = currentIndex * getStep();
        offset = Math.min(offset, getMaxOffset());

        track.style.transform = "translateX(-" + offset + "px)";

        updateButtons();
    }

    function next(opts) {
        goTo(currentIndex + 1, opts);
    }

    function prev(opts) {
        goTo(currentIndex - 1, opts);
    }

    function startAutoplay() {
        stopAutoplay();

        autoplayTimer = setInterval(function () {
            next({ loop: true });
        }, autoplayDelay);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    prevBtn.addEventListener("click", function () {
        prev({ loop: true });
        restartAutoplay();
    });

    nextBtn.addEventListener("click", function () {
        next({ loop: true });
        restartAutoplay();
    });

    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);

    viewport.addEventListener("focusin", stopAutoplay);
    viewport.addEventListener("focusout", startAutoplay);

    viewport.addEventListener("touchstart", stopAutoplay, { passive: true });
    viewport.addEventListener("touchend", startAutoplay, { passive: true });

    viewport.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next({ loop: true });
            restartAutoplay();
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev({ loop: true });
            restartAutoplay();
        }
    });

    var resizeTimer;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            goTo(Math.min(currentIndex, getMaxIndex()));
        }, 150);
    });

    var prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    updateButtons();

    if (!prefersReducedMotion) {
        startAutoplay();
    }
})();