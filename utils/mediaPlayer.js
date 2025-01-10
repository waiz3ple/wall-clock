import logger from './logger';
class MediaPlayer{
	#audio;
	constructor(audioPath, errReporter){
		try {
			this.#audio = new Audio(audioPath);
		} catch (err) {
			errReporter.setError = `Error initializing audio, ${err.message}`;
		}
	}
	
	playSound(){
		if (this.#audio) {
			this.#audio.play();
			this.#audio.loop = true;
		}
	}

	pauseSound() {
		if (this.#audio) this.#audio.pause()
	}
}

const mediaPlayer = new MediaPlayer('/sounds/tick-tock.wav', logger);

export default mediaPlayer;