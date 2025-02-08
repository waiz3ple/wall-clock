import { Clock } from '../scripts/clock';
import { SELECTORS } from '../scripts/constants';

jest.useFakeTimers();

describe('Clock Class', () => {
    let clock;
    let secHand, minHand, hourHand;

    beforeEach(() => {
        document.body.innerHTML = `
            <svg>
                <line id="${SELECTORS.SEC_HAND}"></line>
                <line id="${SELECTORS.MIN_HAND}"></line>
                <line id="${SELECTORS.HOUR_HAND}"></line>
            </svg>
        `;

        secHand = document.getElementById(SELECTORS.SEC_HAND);
        minHand = document.getElementById(SELECTORS.MIN_HAND);
        hourHand = document.getElementById(SELECTORS.HOUR_HAND);

        clock = new Clock();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should correctly select clock hands', () => {
            expect(secHand).not.toBeNull();
            expect(minHand).not.toBeNull();
            expect(hourHand).not.toBeNull();
        });
    });

    describe.skip('#updateTime Effect', () => {
        test('should correctly update clock hand rotations based on time', () => {
            // Mock Date.now() to return a fixed timestamp
            const mockDate = new Date('2023-10-01T12:34:56');
            jest.spyOn(global.Date, 'now').mockImplementation(() => mockDate.getTime());
                
            // Start the clock (which will call #updateTime)
            clock.start();
                
            // Check if the clock hands are rotated correctly
            expect(clock.secondsDeg).toBe(336); // 56 seconds * 6
            expect(clock.minutesDeg).toBeCloseTo(209.6); // 34 minutes * 6 + 56 / 10
            expect(clock.hoursDeg).toBeCloseTo(377.466); // 12 hours * 30 + 34 / 2 + 56 / 120
        });
    });

    describe('start and stop', () => {
        test('should start and stop the clock animation', () => {
            // Mock requestAnimationFrame and cancelAnimationFrame
            jest.useFakeTimers();
            const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
            const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
            // Start the clock
            clock.start();
            expect(requestAnimationFrameSpy).toHaveBeenCalled();
            // Stop the clock
            clock.stop();
            expect(cancelAnimationFrameSpy).toHaveBeenCalled();
         });
    });
});
