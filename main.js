// this is OOP version of script.js
class Query{
	static select(selector) {
		return document.querySelector(selector);
	}
}

class Clock {
	#secondsDeg;
	#minutesDeg;
	#hoursDeg;
	#secHand;
	#minHand;
	#hourHand;
	#coordinate = { x: 0.5, y: 3.5 };
	
	constructor() {
		this.#secHand  = Query.select('#secHand');
		this.#minHand  = Query.select('#minHand');
		this.#hourHand = Query.select('#hourHand');
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
 
const clock = new Clock(); //instance of clock
setInterval(() => clock.rotateHands(), 1000);

class Sound{
	constructor(audioPath){
		this.audio = new Audio(audioPath);
	}
	
	playSound(){
		if (this.audio) {
			this.audio.play();
			this.audio.loop = true;
		}
	}

	pauseSound() {
		if (this.audio) {
			this.audio.pause();
		}
	}
}

const audio = new Sound('./sounds/tick-tock.wav'); //instance of audio


class Toggler {

	toggleElement(element) {
		if (element) {
			const isVisible = element?.style.visibility === 'visible';
			element.style.visibility = isVisible ? 'hidden' : 'visible';
			element.style.animationName = isVisible ? 'fade-out' : 'fade-in';
		}
	}

	toggleTheme(theme) {
		const root = document.documentElement;
		root.setAttribute('data-theme', theme);
	}

	toggleText(state, selector, options) {
		const element = Query.select(selector);
		element.textContent = state?options[0]: options[1];
	}
}

class EventHandler extends Toggler {
	constructor() {
		super();
		this.btnBox = Query.select('.switches-container');
		this.settings = Query.select('.setting-icon');
		this.initializeListeners();
	}

	initializeListeners() {
		this.btnBox.addEventListener('change', (e) => {
			const isChecked = e.target.checked;
			if (e.target.classList.contains('toggle-sound')) {
			    isChecked ? audio.playSound() : audio.pauseSound();
				this.toggleText(isChecked, '.toggle label[for="toggle-sound"]', ['Sound On', 'Sound Off'])
			}

			if (e.target.classList.contains('toggle-color')) {
				const theme =  isChecked ? 'dark' : 'light';
				this.toggleTheme(theme);
				this.toggleText(isChecked, '.toggle label[for="toggle-color"]', ['Dark Mode', 'Light Mode']) 
			}
		});

		this.settings.addEventListener('click', () =>
			this.toggleElement(this.btnBox)
		);
	}
}

const eventHandler = new EventHandler();
console.log(eventHandler)


// remaining 3 features
//local stirage
// error reporting
// text toggling