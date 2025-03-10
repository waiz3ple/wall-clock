export class Toggler {
    toggleElement(element) {
        if (element) {
            const isVisible = element.style.visibility === 'visible';
            element.style.visibility = isVisible ? 'hidden' : 'visible';
            element.style.animationName = isVisible ? 'fade-out' : 'fade-in';
        }
    }

    toggleTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    toggleText(state, selector, options) {
        const [currentText, nextText] = options;
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = state ? currentText : nextText;
        }
    }
}