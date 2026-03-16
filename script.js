// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Select the video element and scroll track container
const video = document.querySelector('video');
const scrollTrack = document.querySelector('.scroll-track');

// Wait for video metadata to load to get accurate duration
video.addEventListener('loadedmetadata', () => {
    // Create ScrollTrigger instance for video
    ScrollTrigger.create({
        trigger: scrollTrack,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
            // Calculate target time based on scroll progress
            const targetTime = self.progress * video.duration;
            
            // Update video currentTime within requestAnimationFrame for smooth performance
            requestAnimationFrame(() => {
                video.currentTime = targetTime;
            });
        }
    });
    
    // Text section animations with specific percentage triggers
    const sections = [
        { element: '.step-1', start: '20%', end: '38%' },
        { element: '.step-2', start: '38%', end: '52%' },
        { element: '.step-3', start: '52%', end: '68%' },
        { element: '.step-4', start: '68%', end: '85%' }
    ];
    
    sections.forEach(({ element, start, end }) => {
        gsap.fromTo(element, 
            { 
                opacity: 0,
                yPercent: -10
            },
            {
                opacity: 1,
                yPercent: -50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: scrollTrack,
                    start: `${start} top`,
                    end: `${end} top`,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });
    
    // Fade Out Hero
    gsap.to('.hero-content', {
        opacity: 0,
        y: -30,
        scrollTrigger: {
            trigger: scrollTrack,
            start: 'top top',
            end: '15% top',
            scrub: true
        }
    });
    
    // Completely hide footer initially
    gsap.set('.final-cta', { autoAlpha: 0, y: 50 });

    // Fade in and slide up at the very end of the scroll track
    gsap.to('.final-cta', {
        autoAlpha: 1, // Handles both opacity and visibility
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        scrollTrigger: {
            trigger: scrollTrack,
            start: '75% top', 
            end: '95% top',
            toggleActions: 'play none none reverse' // Plays cleanly when scrolling down, reverses when scrolling up
        }
    });
});
