import { STORAGE_KEYS } from './constants.js';
import { LocalStorage } from './localStorage.js';
export class StateManager {
    static state = {
        theme: LocalStorage?.getItem(STORAGE_KEYS.THEME) || 'light',
        soundEnabled: LocalStorage?.getItem(STORAGE_KEYS.SOUND_ENABLED) || false,
        errors: [],
    };

    static getState() {
        return this.state;
    }

    static setState(newState) {
        this.state = { ...this.state, ...newState };
        LocalStorage.setItem(STORAGE_KEYS.THEME, this.state.theme);
        LocalStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, this.state.soundEnabled);
     }

    static addError(error) {
        this.state.errors.push(error);
     }

    static clearErrors() {
        this.state.errors = [];
     }
}
