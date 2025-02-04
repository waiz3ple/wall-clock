/* import logger from './logger';
class MediaPlayer{
	#audio;
	constructor(audioPath, errMsg){
        try {
            if (!audioPath) {
                errMsg.setError = "Audio path is required.";
                return;
             }
			this.#audio = new Audio(audioPath);
		} catch (err) {
			errMsg.setError = `Error initializing audio, ${err.message}`;
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

export default mediaPlayer; */