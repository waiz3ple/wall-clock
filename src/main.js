import { Clock } from './clock.js';
import { EventHandler } from './eventHandler.js';
import { Logger } from './logger.js';
import { StateManager } from './stateManager.js';

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