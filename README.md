# Analog Wall Clock

## Overview

This is an hyper-realistic clock application that displays the current time and provides some additional features such as sound effects, light and dark mode color scheme. It's designed to be easy to use and highly customizable to suit your preferences.

## Features

### 1. Real-time Clock

- The application displays the current time with three clock hands (hour, minute, and second).
- The clock updates in real-time, accurately reflecting the current time.

### 2. Sound Effects

- You can enable/disable clock ticking sound effects.
- When enabled, the clock emits a ticking sound every second.

### 3. Color Scheme

- You can choose between a dark and light color scheme for the clock.
- The color scheme preference is stored in your browser's local storage and persists across sessions.

### 4. Error Handling

- The application gracefully handles errors related to audio initialization, sound playback, and local storage.
- Any errors that occur are logged and displayed in the error message box.

## Getting Started

### Prerequisites

You will need a web browser that supports SVG and JavaScript.

### Installation

1. Clone the repository:

```
   git clone https://github.com/waiz3ple/wall-clock.git
```

2. Navigate to the project directory:

  ``` 
   cd wall-clock
 ```  

3. Open the `index.html` file in your preferred web browser.

## Usage

- **Sound Toggle**: Use the "Toggle Sound" switch to enable or disable ticking sound effects.
- **Color Scheme Toggle**: Use the "Toggle Color Scheme" switch to switch between dark and light color schemes.
- **Error Messages**: If any errors occur (e.g., audio initialization fails), they will be displayed in the error message box. Click "close" to clear the error messages.

## Preview

You can see a live demo of the clock here: [Live Demo](https://waiz3ple.github.io/wall-clock)


## Customization

- If you want to use a custom ticking sound, replace `tick-tock.wav` in the `sounds` folder with your desired audio file. Ensure it's in a compatible format (e.g., WAV).
- You can further customize the clock appearance by modifying the CSS in `styles.css`.
- Error handling and logging can be enhanced by modifying the error-handling functions in the JavaScript code.

## Dependencies

- This clock application relies on HTML, CSS, and JavaScript. No external libraries or frameworks are used.

## License

This clock application is open-source and available under the [MIT License](LICENSE).
**Please do not claim this project as yours**

## Author

- Wasiu Ramoni
- GitHub: [GitHub Profile](https://github.com/waiz3ple)

## Contact

If you have any questions, suggestions, or issues, please feel free to reach out to me:

- Email: wasiu@ramoni.pro
- Twitter: [@waiz3ple](https://twitter.com/waiz3ple)
- Telegram: [t.me/waiz3ple](https://t.me/waiz3ple)
