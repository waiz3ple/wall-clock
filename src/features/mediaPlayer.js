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

//const mediaPlayer = new MediaPlayer('./src/asset/sounds/tick-tock.wav', logger);   //for local development - Vite dev server
const mediaPlayer = new MediaPlayer('assets/tick-tock.wav', logger);  //for  gh-pages

export default mediaPlayer;