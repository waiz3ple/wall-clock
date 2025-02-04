import { selector } from '../helper/querySelector';
import local from './localstorage';
import mediaPlayer from './mediaPlayer';
import Toggler, { toggleElement, toggleText, toggleTheme } from './toggler';

class Events extends Toggler {
    constructor() {
        super();
        this.switcheContainer = selector('.switches-container');
        this.settingIcon = selector('.setting-icon');
        this.closedIcon = selector('.close');
        this.initializeListeners();
        this.setups();
    }

    initializeListeners() {
        // Handle theme on page load
        window.addEventListener('load', () => {
            const savedTheme = local.getTheme;
            if (savedTheme && savedTheme !== 'light') {
                toggleTheme(savedTheme);
                selector('#color-checkbox').checked = true;
            }
        });

        // Close tooltip on click outside
        window.addEventListener('click', (e) => {
            if (
                this.switcheContainer.style.visibility === 'visible' &&
                !this.switcheContainer.closest('.setting-container').contains(e.target)
            ) {
                toggleElement(this.switcheContainer);
            }
        });
    }

    setups() {
        // Handle checkbox changes
        this.switcheContainer.addEventListener('change', (e) => {
            const target = e.target;
            const isChecked = target.checked;

            if (target.classList.contains('sound-checkbox')) {
                this.handleSoundToggle(isChecked);
            }

            if (target.classList.contains('color-checkbox')) {
                this.handleThemeToggle(isChecked);
            }
        });

        // Toggle tooltip on settingIcon icon click
        this.settingIcon.addEventListener('click', (e) => {
            //toggleElement(this.switcheContainer);
              e.stopPropagation(); // Prevent event bubbling
            this.switcheContainer.classList.toggle('active');
        });

        // Dismiss logger on close icon click
        this.closedIcon.addEventListener('click', () => {
            logger.dismiss();
        });
    }

    handleSoundToggle(isChecked) {
        if (isChecked) {
            mediaPlayer.playSound();
        } else {
            mediaPlayer.pauseSound();
        }
        toggleText(isChecked, 'label[for="sound-checkbox"]', ['Sound On', 'Sound Off']);
    }

    handleThemeToggle(isChecked) {
        const theme = isChecked ? 'dark' : 'light';
        toggleTheme(theme);
        toggleText(isChecked, 'label[for="color-checkbox"]', ['Dark Mode', 'Light Mode']);
        local.setTheme = theme;
    }
}

export default Events;