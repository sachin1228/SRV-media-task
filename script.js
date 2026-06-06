// Infinite scroll loop - smooth continuous animation

document.addEventListener('DOMContentLoaded', function() {
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

    const mobileTrack = document.querySelector('.mobile-carousel-track');
    if (mobileTrack) {
        const items = Array.from(mobileTrack.querySelectorAll('.mobile-carousel-item'));
        if (items.length) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                mobileTrack.appendChild(clone);
            });

            const trackWidth = mobileTrack.scrollWidth / 2;
            const speed = 60; // pixels per second; adjust for faster/slower scroll
            let startTime = null;

            function animateMobile(timestamp) {
                if (startTime === null) {
                    startTime = timestamp;
                }

                const elapsed = (timestamp - startTime) / 1000;
                const distance = (elapsed * speed) % trackWidth;
                mobileTrack.style.transform = `translateX(-${distance}px)`;
                requestAnimationFrame(animateMobile);
            }

            requestAnimationFrame(animateMobile);
        }
    }
});
