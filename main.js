import { selector } from './utils/querySelector';

import Events from './utils/events';


const logger = new Logger();  

class Clock {
	#secondsDeg;
	#minutesDeg;
	#hoursDeg;
	#secHand;
	#minHand;
	#hourHand;
	#coordinate = { x: 0.5, y: 3.5 };
	
	constructor() {
		this.#secHand = selector('#secHand');
		this.#minHand = selector('#minHand');
		this.#hourHand = selector('#hourHand');
		this.rotateHands();
	}

	#updateTime() {
		const time = new Date();
		const seconds = time.getSeconds();
		const minutes = time.getMinutes();
		const hours   = time.getHours() % 12 || 12;

		// Angle of rotation in degree
		this.#secondsDeg = seconds * 6;
		this.#minutesDeg = minutes * 6 + seconds / 10;
		this.#hoursDeg = hours * 30 + minutes / 2 + seconds / 120;
	}

	#handRotation(hand, angle) {
		const { x, y } = this.#coordinate;
		try {
			hand.setAttribute('transform', `rotate(${angle}, ${x}, ${y})`);
		} catch (err) {
			logger.setError = `Error rotating clock hand, ${err.message}`;
		}
	}

	 rotateHands() {
		this.#updateTime();
		this.#handRotation(this.#secHand, this.#secondsDeg);
		this.#handRotation(this.#minHand, this.#minutesDeg);
		this.#handRotation(this.#hourHand, this.#hoursDeg);
	}
}
 
const clock = new Clock(); //instance of clock
setInterval(() => clock.rotateHands(), 1000);

//const player = new MediaPlayer('./sounds/tick-tock.wav', logger); /** @need attention */

class LocalStorage {
  
	set setTheme(theme){
		try {
			localStorage.setItem('theme', JSON.stringify({ theme }));
		} catch (err) {
			logger.setError = `Error setting local storage, ${err.message}`;
		}
	}

	get getTheme(){
		try {
			return JSON.parse(localStorage.getItem('theme')).theme;
		} catch (err) {
			logger.setError = `Error retrieving from local storage ${err.message}`;
		}
	}
}

const local = new LocalStorage();

const eventHandler = new Events();
logger.log()
