import { LocalStorage } from '../scripts/localStorage';
import { StateManager } from '../scripts/stateManager';

describe('StateManager', () => {
  beforeEach(() => {
    StateManager.state = { theme: 'light', soundEnabled: false };
    jest.spyOn(LocalStorage, 'setItem').mockImplementation(() => {});
  });

  test('should initialize with default state', () => {
    expect(StateManager.state).toEqual({ theme: 'light', soundEnabled: false });
  });

  test('should update state and save to localStorage', () => {
    StateManager.setState({ theme: 'dark' });
    expect(StateManager.state.theme).toBe('dark');
    expect(LocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });
});