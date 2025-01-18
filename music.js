class MusicPlayer {
    constructor() {
        if (!MusicPlayer.instance) {
            this.audio = new Audio('Underclocked - Eric Skiff.mp3');
            this.audio.loop = true;
            this.audio.volume = 0.5;
            
            // Store the current time before page unload
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('musicTime', this.audio.currentTime);
            });

            MusicPlayer.instance = this;
        }
        return MusicPlayer.instance;
    }

    play() {
        // Try to resume from the last stored position
        const lastTime = sessionStorage.getItem('musicTime');
        if (lastTime) {
            this.audio.currentTime = parseFloat(lastTime);
        }
        
        // Start playing
        this.audio.play().catch(error => {
            console.log("Playback failed:", error);
        });
        
        // Periodically store the current time
        setInterval(() => {
            sessionStorage.setItem('musicTime', this.audio.currentTime);
        }, 1000);
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    setCurrentTime(time) {
        this.audio.currentTime = time;
    }
}

const musicPlayer = new MusicPlayer(); 