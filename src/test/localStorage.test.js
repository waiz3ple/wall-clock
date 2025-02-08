import { LocalStorage } from '../scripts/localStorage';
import { StateManager } from '../scripts/stateManager';

jest.mock('../scripts/stateManager', () => ({
    StateManager: {
        addError: jest.fn(),
    },
}));

describe.skip('LocalStorage Class', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn();
    });

    describe('setItem', () => {
        test('should store a serialized value in localStorage', () => {
            LocalStorage.setItem('testKey', { name: 'John' });

            expect(localStorage.setItem).toHaveBeenCalledWith(
                'testKey',
                JSON.stringify({ name: 'John' })
            );
        });

        test('should handle JSON serialization errors gracefully', () => {
            const circularReference = {};
            circularReference.self = circularReference;

            LocalStorage.setItem('invalidKey', circularReference);

            expect(StateManager.addError).toHaveBeenCalledWith(
                expect.stringContaining('Error saving to localStorage')
            );
        });

        test('should not throw an error if localStorage is disabled', () => {
            Storage.prototype.setItem.mockImplementation(() => {
                throw new Error('localStorage is disabled');
            });

            expect(() => LocalStorage.setItem('key', 'value')).not.toThrow();
            expect(StateManager.addError).toHaveBeenCalledWith(
                expect.stringContaining('Error saving to localStorage')
            );
        });
    });

    describe('getItem', () => {
        test('should retrieve a parsed value from localStorage', () => {
            localStorage.getItem.mockReturnValue(JSON.stringify({ age: 30 }));

            const result = LocalStorage.getItem('testKey');
            expect(result).toEqual({ age: 30 });
            expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
        });

        test('should return null for non-existent keys', () => {
            localStorage.getItem.mockReturnValue(null);

            const result = LocalStorage.getItem('missingKey');
            expect(result).toBeNull();
        });

        test('should handle JSON parsing errors gracefully', () => {
            localStorage.getItem.mockReturnValue('invalid JSON');

            const result = LocalStorage.getItem('corruptKey');
            expect(result).toBeNull();
            expect(StateManager.addError).toHaveBeenCalledWith(
                expect.stringContaining('Error retrieving from localStorage')
            );
        });

        test('should return null if localStorage is disabled', () => {
            Storage.prototype.getItem.mockImplementation(() => {
                throw new Error('localStorage is disabled');
            });

            const result = LocalStorage.getItem('key');
            expect(result).toBeNull();
            expect(StateManager.addError).toHaveBeenCalledWith(
                expect.stringContaining('Error retrieving from localStorage')
            );
        });
    });
});
