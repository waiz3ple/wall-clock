import { Clock } from '../scripts/clock';
import { EventHandler } from '../scripts/eventHandler';
import { Logger } from '../scripts/logger';

describe.skip('Main', () => {
  test('should initialize clock and event handlers', () => {
    const clock = new Clock();
    const logger = new Logger();
    const eventHandler = new EventHandler();

    expect(clock).toBeInstanceOf(Clock);
    expect(logger).toBeInstanceOf(Logger);
    expect(eventHandler).toBeInstanceOf(EventHandler);
  });
});