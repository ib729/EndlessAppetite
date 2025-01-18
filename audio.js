// Create a single global audio instance
let globalAudio = null;

function initializeAudio() {
    if (!globalAudio) {
        globalAudio = new Audio('Underclocked - Eric Skiff.mp3');
        globalAudio.loop = true;
        globalAudio.volume = 0.5;
        globalAudio.play();
    }
}

// Initialize on first page load
initializeAudio(); 