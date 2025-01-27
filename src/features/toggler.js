import { selector } from '../helper/querySelector';

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

	toggleText(state, select, options) {
		const element = selector(select);
		element.textContent = state?options[0]:options[1];
	}
}

export default Toggler;

export const { toggleElement, toggleTheme, toggleText } = new Toggler();