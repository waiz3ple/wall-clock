class Query{
	static select(selector) {
		return document.querySelector(selector);
	}
}

class Logger {
	#errMessages;
	#errWrapper = Query.select('.error-list');
	#errContainer = Query.select('.error-container');

	constructor() {
		this.#errMessages = [];
	}

	log() {
		if (this.#errMessages.length) {
			const ul = document.createElement('ul');
			ul.classList.add('error-list')

			this.#errMessages.forEach(errMessage => {
				const li = document.createElement('li');
				li.textContent = errMessage;
				ul.appendChild(li);
			});
			this.#errContainer.prepend(ul);
			return;
		}
		this.#errContainer.style.display = 'none';
	}

	dismiss() {
		this.#errMessages = [];
		this.#errContainer.style.display = 'none';
	}

	set setError(err){
		this.#errMessages.push(err);
	}
}

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
		this.#secHand = Query.select('#secHand');
		this.#minHand = Query.select('#minHand');
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
		if (this.#audio) {
			this.#audio.pause();
		}
	}
}

const player = new MediaPlayer('./sounds/tick-tock.wav'); //instance of audio

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
		element.textContent = state?options[0]:options[1];
	}
}

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


class EventHandler extends Toggler {
	constructor() {
		super();
		this.btnBox = Query.select('.switches-container');
		this.settings = Query.select('.setting-icon');
		this.closedIcon = Query.select('.closed');
		this.initializeListeners();
	}

	initializeListeners() {
		['load','click'].forEach(action => {
			window.addEventListener(action, (e)=>{
				if (action === 'load' && local.getTheme && local.getTheme !== 'light') {
					this.toggleTheme(local.getTheme)
					Query.select('#color-checkbox').checked = true;
				}
				// close tooltip on clickout
				if ( action === 'click' && 
					this.btnBox.style.visibility ==='visible' &&
					!this.btnBox.closest('.setting-container').contains(e.target)
				){
					this.toggleElement(this.btnBox)	
				}
			})
		})

		this.btnBox.addEventListener('change', (e) => {
			const isChecked = e.target.checked;
			if (e.target.classList.contains('sound-checkbox')) {
			    isChecked ? player.playSound() : player.pauseSound();
				this.toggleText(isChecked, 'label[for="sound-checkbox"]', ['Sound On', 'Sound Off'])
			}

			if (e.target.classList.contains('color-checkbox')) {
				const theme =  isChecked ? 'dark' : 'light';
				this.toggleTheme(theme);
				this.toggleText(isChecked, 'label[for="color-checkbox"]', ['Dark Mode', 'Light Mode']) 
				local.setTheme = theme;
			}
		});
        
		
		this.settings.addEventListener('click', () => {
			this.toggleElement(this.btnBox)
			}
		);

		this.closedIcon.addEventListener('click', ()=>{
			logger.dismiss()
		})
	}
}

const eventHandler = new EventHandler();
logger.log()
