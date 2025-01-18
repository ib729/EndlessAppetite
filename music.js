class MusicPlayer {
    constructor() {
        if (!MusicPlayer.instance) {
            this.audio = new Audio('Underclocked - Eric Skiff.mp3');
            this.audio.loop = true;
            this.audio.volume = 0.5;
            MusicPlayer.instance = this;
        }
        return MusicPlayer.instance;
    }

    play() {
        this.audio.play();
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    setCurrentTime(time) {
        this.audio.currentTime = time;
    }
}

const musicPlayer = new MusicPlayer(); 