import { StateManager } from './stateManager.js';

export class LocalStorage {
  static setItem(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
     StateManager.addError(`Error saving to localStorage: ${error.message}`);
    }
  }

  static getItem(key) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
     StateManager.addError(`Error retrieving from localStorage: ${error.message}`);
      return null;
    }
  }
}