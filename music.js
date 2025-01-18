class MusicPlayer {
    constructor() {
        if (!MusicPlayer.instance) {
            this.audio = new Audio('audio/Underclocked - Eric Skiff.opus');
            this.darkAudio = new Audio('audio/Ghost From The Future - C152.opus');
            this.audio.loop = true;
            this.darkAudio.loop = true;
            this.audio.volume = 0.5;
            this.darkAudio.volume = 0.5;
            this.isPlayingDark = false;
            
            // Store the current time before page unload
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('musicTime', this.audio.currentTime);
            });

            // Preload both audio files
            this.audio.load();
            this.darkAudio.load();

            MusicPlayer.instance = this;
        }
        return MusicPlayer.instance;
    }

    async play() {
        try {
            // Try to resume from the last stored position
            const lastTime = sessionStorage.getItem('musicTime');
            if (lastTime) {
                this.audio.currentTime = parseFloat(lastTime);
            }
            
            await this.audio.play();
            
            // Periodically store the current time
            setInterval(() => {
                if (!this.isPlayingDark) {
                    sessionStorage.setItem('musicTime', this.audio.currentTime);
                }
            }, 1000);
        } catch (error) {
            console.log("Playback failed:", error);
        }
    }

    async playDarkMusic() {
        try {
            this.audio.pause();
            this.darkAudio.currentTime = 0;
            await this.darkAudio.play();
            this.isPlayingDark = true;
        } catch (error) {
            console.log("Dark music playback failed:", error);
        }
    }

    async stopDarkMusic() {
        try {
            this.darkAudio.pause();
            this.darkAudio.currentTime = 0;
            this.isPlayingDark = false;
            await this.play();
        } catch (error) {
            console.log("Failed to restore original music:", error);
        }
    }

    getCurrentTime() {
        return this.isPlayingDark ? this.darkAudio.currentTime : this.audio.currentTime;
    }

    setCurrentTime(time) {
        if (this.isPlayingDark) {
            this.darkAudio.currentTime = time;
        } else {
            this.audio.currentTime = time;
        }
    }
}

const musicPlayer = new MusicPlayer(); 