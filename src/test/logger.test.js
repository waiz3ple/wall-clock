import { Logger } from '../scripts/logger';

describe.skip('Logger', () => {
  let logger;

  beforeEach(() => {
    logger = new Logger();
    document.body.innerHTML = `
      <div class="error-container">
        <div class="closed"></div>
      </div>
    `;
  });

  test('should log errors and display them in the error container', () => {
    logger.setError = 'Test error 1';
    logger.setError = 'Test error 2';
    logger.log();

    const errorList = document.querySelector('.error-list');
    expect(errorList).not.toBeNull();
    expect(errorList.children.length).toBe(2);
    expect(errorList.children[0].textContent).toBe('Test error 1');
    expect(errorList.children[1].textContent).toBe('Test error 2');
  });

  test('should dismiss errors and hide the error container', () => {
    logger.setError = 'Test error';
    logger.log();
    logger.dismiss();

    const errorContainer = document.querySelector('.error-container');
    expect(errorContainer.style.display).toBe('none');
    expect(logger._errMessages.length).toBe(0);
  });
});