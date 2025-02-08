import { SELECTORS } from './constants.js';

export class Clock {
    #secHand = document.querySelector(SELECTORS.SEC_HAND);
    #minHand = document.querySelector(SELECTORS.MIN_HAND);
    #hourHand = document.querySelector(SELECTORS.HOUR_HAND);
    #coordinate = { x: 0.5, y: 3.5 };
    #animationFrameId = null;

#updateTime() {
    const time = new Date();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12 || 12;

    const secondsDeg = seconds * 6;
    const minutesDeg = minutes * 6 + seconds / 10;
    const hoursDeg = hours * 30 + minutes / 2 + seconds / 120;

    this.#handRotation(this.#secHand, secondsDeg);
    this.#handRotation(this.#minHand, minutesDeg);
    this.#handRotation(this.#hourHand, hoursDeg);
  }

#handRotation(hand, angle) {
    const { x, y } = this.#coordinate;
    hand?.setAttribute('transform', `rotate(${angle}, ${x}, ${y})`);
  }

start() {
    const animate = () => {
        this.#updateTime();
    // performace optimization: less load on CPU & smoother animation instead on setInterval
        this.#animationFrameId = requestAnimationFrame(animate); 
    };
    animate(); 
  }

    stop() {
        if (this.#animationFrameId) {
            cancelAnimationFrame(this.#animationFrameId);
    }
  }
}