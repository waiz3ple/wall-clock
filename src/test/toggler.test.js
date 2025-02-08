import { Toggler } from '../scripts/toggler';

describe('Toggler Class', () => {
    let toggler;
    let mockElement;

    beforeEach(() => {
        toggler = new Toggler();
        mockElement = document.createElement('div');
        document.body.appendChild(mockElement);
    });

    afterEach(() => {
        document.body.innerHTML = ''; // Clean up DOM
    });

    describe.skip('toggleElement', () => {
        it('should make the element hidden if currently visible', () => {
            mockElement.style.visibility = 'visible';
            toggler.toggleElement(mockElement);
            expect(mockElement.style.visibility).toBe('hidden');
            expect(mockElement.style.animationName).toBe('fade-out');
        });

        it('should make the element visible if currently hidden', () => {
            mockElement.style.visibility = 'hidden';
            toggler.toggleElement(mockElement);
            expect(mockElement.style.visibility).toBe('visible');
            expect(mockElement.style.animationName).toBe('fade-in');
        });

        it('should do nothing if element is null or undefined', () => {
            expect(() => toggler.toggleElement(null)).not.toThrow();
            expect(() => toggler.toggleElement(undefined)).not.toThrow();
        });
    });

    describe('toggleTheme', () => {
        it('should set the theme attribute on the root HTML element', () => {
            toggler.toggleTheme('dark');
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

            toggler.toggleTheme('light');
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        });
    });

    describe('toggleText', () => {
        let textElement;

        beforeEach(() => {
            textElement = document.createElement('p');
            textElement.setAttribute('id', 'test-text');
            document.body.appendChild(textElement);
        });

        it('should set text to the first option when state is true', () => {
            toggler.toggleText(true, '#test-text', ['Hello', 'Goodbye']);
            expect(textElement.textContent).toBe('Hello');
        });

        it('should set text to the second option when state is false', () => {
            toggler.toggleText(false, '#test-text', ['Hello', 'Goodbye']);
            expect(textElement.textContent).toBe('Goodbye');
        });

        it('should do nothing if the selector does not match any element', () => {
            expect(() => toggler.toggleText(true, '#nonexistent', ['Hello', 'Goodbye'])).not.toThrow();
        });
    });
});

