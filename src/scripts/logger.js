import { SELECTORS } from './constants.js';

export class Logger {
#errMessages = [];
#errContainer = document.querySelector(SELECTORS.ERROR_CONTAINER);
#closeButton = document.querySelector(SELECTORS.CLOSED_ICON);


  log() {
    if (this.#errMessages.length) {
      const ul = document.createElement('ul');
      ul.classList.add('error-list');

      this.#errMessages.forEach((errMessage) => {
        const li = document.createElement('li');
        li.textContent = errMessage;
        ul.appendChild(li);
      });
      this.#errContainer.prepend(ul);
      this.#closeButton.style.display = 'block';
      return;
    }
    this.#errContainer.style.display = 'none';
  }

  dismiss() {
    this.#errMessages = [];
    this.#errContainer.style.display = 'none';
  }

  set setError(err) {
    this.#errMessages.push(err);
  }
}