// this is OOP version of script.js


class Clock {
	#secondsDeg;
	#minutesDeg;
	#hoursDeg;
	#secHand;
	#minHand;
	#hourHand;
	#coordinate = { x: 0.5, y: 3.5 };
	
	static select(selector) {
		return document.querySelector(selector);
	}

	constructor() {
		this.#secHand  = Clock.select('#secHand');
		this.#minHand  = Clock.select('#minHand');
		this.#hourHand = Clock.select('#hourHand');
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
		hand.setAttribute('transform', `rotate(${angle}, ${x}, ${y})`);
	}

	 rotateHands() {
		this.#updateTime();
		this.#handRotation(this.#secHand, this.#secondsDeg);
		this.#handRotation(this.#minHand, this.#minutesDeg);
		this.#handRotation(this.#hourHand, this.#hoursDeg);
	}
}
 

const clock = new Clock();

setInterval(() => clock.rotateHands(), 1000);

//----------sound----
class Sound{
	constructor(audio){
		this.audio = audio;
	}
	PlaySound(){
		if (this.audio) {
			this.audio.play();
			this.audio.loop = true;
		}
	}
}

const audio = new Sound('./sounds/tick-tock.wav');
console.log(audio)


//----------sound----