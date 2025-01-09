class MediaPlayer{
	#audio;
	constructor(audioPath){
		try {
			this.#audio = new Audio(audioPath);
		} catch (err) {
			logger.setError = `Error initializing audio, ${err.message}`;
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

export { MediaPlayer };

