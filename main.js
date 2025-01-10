import { MediaPlayer } from './utils/mediaPlayer';
import { selector } from './utils/querySelector';
import Toggler, { toggleElement, toggleText, toggleTheme } from './utils/toggler';
class Logger {
	#errMessages;
	#errContainer = selector('.error-container');

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

const player = new MediaPlayer('./sounds/tick-tock.wav', logger); //instance of audio

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
		this.btnBox = selector('.switches-container');
		this.settings = selector('.setting-icon');
		this.closedIcon = selector('.close');
		this.initializeListeners();
	}

	initializeListeners() {
		['load','click'].forEach(action => {
			window.addEventListener(action, (e)=>{
				if (action === 'load' && local.getTheme && local.getTheme !== 'light') {
					toggleTheme(local.getTheme)
					selector('#color-checkbox').checked = true;
				}
				// close tooltip on clickout
				if ( action === 'click' && 
					this.btnBox.style.visibility ==='visible' &&
					!this.btnBox.closest('.setting-container').contains(e.target)
				){
					toggleElement(this.btnBox)	
				}
			})
		})

		this.btnBox.addEventListener('change', (e) => {
			const isChecked = e.target.checked;
			if (e.target.classList.contains('sound-checkbox')) {
			    isChecked ? player.playSound() : player.pauseSound();
				toggleText(isChecked, 'label[for="sound-checkbox"]', ['Sound On', 'Sound Off'])
			}

			if (e.target.classList.contains('color-checkbox')) {
				const theme =  isChecked ? 'dark' : 'light';
				toggleTheme(theme);
				toggleText(isChecked, 'label[for="color-checkbox"]', ['Dark Mode', 'Light Mode']) 
				local.setTheme = theme;
			}
		});
        
		
		this.settings.addEventListener('click', () => {
			    toggleElement(this.btnBox)
			}
		);

		this.closedIcon.addEventListener('click', ()=>{
			logger.dismiss()
		})
	}
}

const eventHandler = new EventHandler();
logger.log()
