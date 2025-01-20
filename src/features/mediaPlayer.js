import logger from './logger';
class MediaPlayer{
	#audio;
	constructor(audioPath, errReporter){
        try {
            if (!audioPath)  throw new Error("Audio path is required.");
			this.#audio = new Audio(audioPath);
		} catch (err) {
			errReporter.setError = `Error initializing audio, ${err.message}`;
		}
	}
	
	playSound(){
		if (this.#audio) {
			this.#audio?.play();
			this.#audio.loop = true;
		}
	}

	pauseSound() {
		if (this.#audio) this.#audio.pause()
	}
}

const audioPath = (import.meta.env.MODE === 'development')
    ? './src/assets/sounds/tick-tock.wav'
    : 'assets/tick-tock.wav';

const mediaPlayer = new MediaPlayer(audioPath, logger);  //instance of mediaPlayer

export default mediaPlayer;