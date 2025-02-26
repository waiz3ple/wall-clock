import { AUDIO_PATH, SELECTORS, THEMES } from './constants';
import { MediaPlayer } from './mediaPlayer';
import { StateManager } from './stateManager';
import { Toggler } from './toggler';

export class EventHandler extends Toggler {
  constructor() {
    super();
    this.switchesWrapper = document.querySelector(SELECTORS.SWITCHES_CONTAINER);
    this.settings = document.querySelector(SELECTORS.SETTING_ICON);
    this.closedIcon = document.querySelector(SELECTORS.CLOSED_ICON);
    this.player = new MediaPlayer(AUDIO_PATH);
    this.initializeListeners();
  }

  #debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  initializeListeners() {
    window.addEventListener('load', () => {
      const { theme } = StateManager.getState();
      if (theme && theme !== THEMES.LIGHT) {
            this.toggleTheme(theme);
            document.querySelector(SELECTORS.COLOR_CHECKBOX).checked = true;
        }

    });

    window.addEventListener(
      'click',
      this.#debounce((e) => { // performance optimization
        if (
          this.switchesWrapper.style.visibility === 'visible' &&
          !this.switchesWrapper.closest('.setting-container').contains(e.target)
        ) {
          this.toggleElement(this.switchesWrapper);
        }
      }, 100)
    );

    this.switchesWrapper?.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
        if (e.target.classList.contains('sound-checkbox')) {
        StateManager.setState({ soundEnabled: isChecked });
        isChecked ? this.player.playSound() : this.player.pauseSound();
        this.toggleText(isChecked, SELECTORS.SOUND_LABEL, ['Sound On', 'Sound Off']);
      }

      if (e.target.classList.contains('color-checkbox')) {
        const theme = isChecked ? THEMES.DARK : THEMES.LIGHT;
        StateManager.setState({ theme });
        this.toggleTheme(theme);
        this.toggleText(isChecked, SELECTORS.COLOR_LABEL, ['Dark Mode', 'Light Mode']);
      }
    });

    this.settings?.addEventListener('click', () => this.toggleElement(this.switchesWrapper));
      this.closedIcon?.addEventListener('click', () => {
          StateManager.clearErrors();
          this.closedIcon.style.display = 'none'
      });
  }
}