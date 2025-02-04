import { SELECTORS } from './constants';

export class Logger {
     #errMessages = [];
     #errWrapper = document.querySelector(SELECTORS.ERROR_LIST);
     #errContainer = document.querySelector(SELECTORS.ERROR_CONTAINER);

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