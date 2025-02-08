//import { describe, expect, jest, test } from '@jest/globals';
import { SELECTORS, THEMES } from '../scripts/constants';
import { EventHandler } from '../scripts/eventHandler';
import { MediaPlayer } from '../scripts/mediaPlayer';
import { StateManager } from '../scripts/stateManager';

jest.mock('../scripts/mediaPlayer');
jest.mock('../scripts/stateManager', () => ({
  getState: jest.fn(() => ({ theme: 'light' })), // Use the imported THEMES
  setState: jest.fn(),
  clearErrors: jest.fn()
}));

describe('EventHandler', () => {
  let eventHandler;
  let mockPlaySound, mockPauseSound;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="setting-container">
        <div id="switches-wrapper" style="visibility: hidden"></div>
        <input type="checkbox" class="sound-checkbox" />
        <input type="checkbox" class="color-checkbox" />
        <label id="sound-label">Sound Off</label>
        <label id="color-label">Light Mode</label>
        <div id="setting-icon"></div>
        <div id="closed-icon"></div>
      </div>
    `;

    MediaPlayer.mockImplementation(() => {
      mockPlaySound = jest.fn();
      mockPauseSound = jest.fn();
      return { playSound: mockPlaySound, pauseSound: mockPauseSound };
    });

    eventHandler = new EventHandler();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize correctly', () => {
    expect(eventHandler.switchesWrapper).toBeInstanceOf(HTMLElement);
    expect(eventHandler.settings).toBeInstanceOf(HTMLElement);
    expect(eventHandler.closedIcon).toBeInstanceOf(HTMLElement);
    expect(eventHandler.player).toBeDefined();
  });

  test('should toggle theme based on saved state', () => {
    StateManager.getState.mockReturnValueOnce({ theme: THEMES.DARK });
    window.dispatchEvent(new Event('load'));
    expect(document.querySelector(SELECTORS.COLOR_CHECKBOX).checked).toBe(true);
  });

  test('should toggle sound on checkbox change', () => {
    const soundCheckbox = document.querySelector('.sound-checkbox');
    soundCheckbox.checked = true;
    soundCheckbox.dispatchEvent(new Event('change'));

    expect(StateManager.setState).toHaveBeenCalledWith({ soundEnabled: true });
    expect(mockPlaySound).toHaveBeenCalled();
  });

  test('should toggle color theme on checkbox change', () => {
    const colorCheckbox = document.querySelector('.color-checkbox');
    colorCheckbox.checked = true;
    colorCheckbox.dispatchEvent(new Event('change'));

    expect(StateManager.setState).toHaveBeenCalledWith({ theme: THEMES.DARK });
  });

  test('should toggle settings panel visibility', () => {
    const settingIcon = document.querySelector('#setting-icon');
    const switchesWrapper = document.querySelector('#switches-wrapper');
    
    settingIcon.click();
    expect(switchesWrapper.style.visibility).toBe('visible');
  });

  test('should clear errors on closed icon click', () => {
    const closedIcon = document.querySelector('#closed-icon');
    closedIcon.click();
    expect(StateManager.clearErrors).toHaveBeenCalled();
  });
});
