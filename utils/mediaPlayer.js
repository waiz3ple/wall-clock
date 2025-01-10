export class MediaPlayer{
	#audio;
	constructor(audioPath, errMessage){
		try {
			this.#audio = new Audio(audioPath);
		} catch (err) {
			errMessage['setError'] = `Error initializing audio, ${err.message}`;
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

