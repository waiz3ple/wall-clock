import { AUDIO_PATH } from '../scripts/constants';
import { MediaPlayer } from '../scripts/mediaPlayer';

describe.skip('MediaPlayer', () => {
  let player;

  beforeEach(() => {
    player = new MediaPlayer(AUDIO_PATH);
  });

  test('should play audio', () => {
    const playSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'play');
    player.playSound();
    expect(playSpy).toHaveBeenCalled();
   
  });

  test('should pause audio', () => {
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');
    player.pauseSound();
    expect(pauseSpy).toHaveBeenCalled();
  });
});