import { selector } from '../helper/querySelector';
import local from './localstorage';
import mediaPlayer from './mediaPlayer';
import Toggler, { toggleElement, toggleText, toggleTheme } from './toggler';

class Events extends Toggler {
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
	}

	setups() {
		this.btnBox.addEventListener('change', (e) => {
			const isChecked = e.target.checked;
			if (e.target.classList.contains('sound-checkbox')) {
				isChecked ? mediaPlayer.playSound() : mediaPlayer.pauseSound();
				toggleText(isChecked, 'label[for="sound-checkbox"]', ['Sound On', 'Sound Off'])
			}

			if (e.target.classList.contains('color-checkbox')) {
				const theme = isChecked ? 'dark' : 'light';
				toggleTheme(theme);
				toggleText(isChecked, 'label[for="color-checkbox"]', ['Dark Mode', 'Light Mode'])
				local.setTheme = theme;
			}
		});


		this.settings.addEventListener('click', () => {
			toggleElement(this.btnBox)
		});

		this.closedIcon.addEventListener('click', () => {
			logger.dismiss()
		})
	}
}

export default Events;