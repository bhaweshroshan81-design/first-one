document.addEventListener('DOMContentLoaded', () => {
    const optionBtns = document.querySelectorAll('.option-btn');
    const videoOverlay = document.getElementById('video-overlay');
    const closeBtn = document.getElementById('close-btn');
    const surpriseVideo = document.getElementById('surprise-video');

    optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const videoFile = btn.getAttribute('data-video');

            // Check if it's the "Except You" button
            if (btn.textContent.includes('Except You')) {
                triggerErrorEffect(e.clientX, e.clientY);
                return;
            }

            // Set the source dynamically
            if (videoFile) {
                surpriseVideo.src = videoFile;
                surpriseVideo.load();

                // Show overlay
                videoOverlay.classList.remove('hidden');

                // Play video after source update
                surpriseVideo.play().catch(error => {
                    console.log("Auto-play prevented:", error);
                });
            } else {
                console.error("No video file specified for this button!");
            }
        });
    });

    function triggerErrorEffect(x, y) {
        // Play error sound if you want, but sticking to visual for now
        // Spawn multiple "Error" texts
        const count = 20;
        for (let i = 0; i < count; i++) {
            const errorSpan = document.createElement('span');
            errorSpan.classList.add('error-text');
            errorSpan.textContent = "Error!";

            // Random offset
            const xOffset = (Math.random() - 0.5) * 200;
            const yOffset = (Math.random() - 0.5) * 200;

            errorSpan.style.left = `${x + xOffset}px`;
            errorSpan.style.top = `${y + yOffset}px`;

            // Random delay
            errorSpan.style.animationDelay = `${Math.random() * 0.5}s`;

            document.body.appendChild(errorSpan);

            // Cleanup
            setTimeout(() => {
                errorSpan.remove();
            }, 1500);
        }
    }


    // Close logic
    closeBtn.addEventListener('click', closeVideo);

    // Close on clicking outside video wrapper
    videoOverlay.addEventListener('click', (e) => {
        if (e.target === videoOverlay) {
            closeVideo();
        }
    });

    function closeVideo() {
        videoOverlay.classList.add('hidden');
        surpriseVideo.pause();
        surpriseVideo.currentTime = 0; // Reset video
    }
});
