// Infinite scroll loop - smooth continuous animation

document.addEventListener('DOMContentLoaded', function() {
    // Desktop vertical carousel
    const tracks = document.querySelectorAll('.col-track');
    const animationDurations = [14, 18, 16];

    tracks.forEach((track, index) => {
        const images = Array.from(track.querySelectorAll('img'));
        const imageHeight = 200; // Height of each image
        const gap = 12; // Gap between images
        const itemHeight = imageHeight + gap;

        // Clone images to create seamless loop
        images.forEach(img => {
            const clone = img.cloneNode(true);
            track.appendChild(clone);
        });

        let scrollPosition = 0;
        const totalHeight = images.length * itemHeight;
        const duration = animationDurations[index];
        const speed = totalHeight / duration; // pixels per second
        let startTime = Date.now();

        function animate() {
            const currentTime = Date.now();
            const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
            scrollPosition = (elapsed * speed) % (totalHeight * 2); // Loop through doubled height

            if (scrollPosition >= totalHeight) {
                scrollPosition = scrollPosition - totalHeight;
            }

            track.style.transform = `translateY(-${scrollPosition}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    });

    // Mobile horizontal carousel - using same pattern as desktop
    const mobileTrack = document.querySelector('.mobile-carousel-track');
    if (mobileTrack) {
        const items = Array.from(mobileTrack.querySelectorAll('.mobile-carousel-item'));
        
        if (items.length) {
            // Clone items to create seamless loop
            items.forEach(item => {
                const clone = item.cloneNode(true);
                mobileTrack.appendChild(clone);
            });

            const itemWidth = 140; // Width of each carousel item (from CSS)
            const gap = 12; // Gap between items
            const itemTotalWidth = itemWidth + gap;
            const totalWidth = items.length * itemTotalWidth;
            const speed = 80; // pixels per second
            let scrollPosition = 0;
            let startTime = Date.now();

            function animateMobile() {
                const currentTime = Date.now();
                const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
                scrollPosition = (elapsed * speed) % (totalWidth * 2); // Loop through doubled width

                if (scrollPosition >= totalWidth) {
                    scrollPosition = scrollPosition - totalWidth;
                }

                mobileTrack.style.transform = `translateX(-${scrollPosition}px)`;
                requestAnimationFrame(animateMobile);
            }

            animateMobile();
        }
    }
});
