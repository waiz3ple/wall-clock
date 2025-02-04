import { Clock } from './scripts/clock.js';
import { EventHandler } from './scripts/eventHandler.js';
import { Logger } from './scripts/logger.js';
import { StateManager } from './scripts/stateManager.js';

const logger = new Logger();
const clock = new Clock();
const eventHandler = new EventHandler();

clock.start();

// Log errors from state
const logErrors = () => {
  const { errors } = StateManager.getState();
  if (errors.length) {
    errors.forEach((error) => logger.setError = error);
    logger.log();
  }
};

logErrors();