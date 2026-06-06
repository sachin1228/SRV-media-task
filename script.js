// Infinite scroll loop - smooth continuous animation
document.addEventListener('DOMContentLoaded', function() {
    const tracks = document.querySelectorAll('.col-track');
    const animationDurations = [14, 18, 16]; // Match CSS animation durations
    
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
            
            // Reset position seamlessly
            if (scrollPosition >= totalHeight) {
                scrollPosition = scrollPosition - totalHeight;
            }
            
            track.style.transform = `translateY(-${scrollPosition}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });
});
