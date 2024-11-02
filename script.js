// Select all cards
const cards = document.querySelectorAll('.card');

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to toggle 'in-view' class based on scroll position
function checkCards() {
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('in-view');
        } else {
            card.classList.remove('in-view'); // Remove class when not in view
        }
    });
}

// Run checkCards on scroll and on initial load
window.addEventListener('scroll', checkCards);
window.addEventListener('load', checkCards);

// Background music functionality
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-music');
    const muteButton = document.getElementById('mute-button');
    const musicIcon = document.getElementById('music-icon');

    muteButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => console.log("Error playing audio:", error));
            musicIcon.textContent = 'pause';
        } else {
            audio.pause();
            musicIcon.textContent = 'play_arrow';
        }
    });

    // Initialize both bracket animations
    initializeBracketAnimation('bracketCanvas1', 'second-div');
    initializeBracketAnimation('bracketCanvas2', 'forth-div');
});

// Function to initialize bracket animation
function initializeBracketAnimation(canvasId, divId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // Resize canvas to fill the parent div
    canvas.width = document.getElementById(divId).clientWidth;
    canvas.height = document.getElementById(divId).clientHeight;

    const brackets = [];
    const bracketCount = 30; // Number of brackets
    const bracketSizes = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
    const opacities = [0.1, 0.2]; // Different opacity values

    // Generate random brackets
    for (let i = 0; i < bracketCount; i++) {
        const size = bracketSizes[Math.floor(Math.random() * bracketSizes.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const direction = Math.random() < 0.5 ? 1 : -1; // Random direction
        const speed = Math.random() * 1 + 0.5; // Random speed
        const opacity = opacities[Math.floor(Math.random() * opacities.length)];
        brackets.push({ char: Math.random() < 0.5 ? '<' : '>', size, x, y, direction, speed, opacity });
    }

    function drawBrackets() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        brackets.forEach(bracket => {
            ctx.font = `${bracket.size}px Arial`;
            ctx.fillStyle = `rgba(33, 33, 33, ${bracket.opacity})`;
            ctx.fillText(bracket.char, bracket.x, bracket.y);
            bracket.y += bracket.speed * bracket.direction; // Move the bracket vertically
            
            // Reverse direction if it reaches the edges
            if (bracket.y < 0 || bracket.y > canvas.height) {
                bracket.direction *= -1;
            }
        });

        requestAnimationFrame(drawBrackets); // Continue the animation
    }

    drawBrackets(); // Start the animation
}

// this is for the scrolltotop btn
// Get the button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show or hide the button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to the top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
    });
}


