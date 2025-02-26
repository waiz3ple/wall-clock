export class MediaPlayer {
    #audio;
    constructor(audioPath) {
        this.#audio = new Audio(audioPath);
    }

    playSound() {
        if (this.#audio) {
            this.#audio.play();
            this.#audio.loop = true;
        }
    }

    pauseSound() {
        this.#audio.pause();
    }
}