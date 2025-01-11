# Analog Wall Clock

## Overview

The **Analog Wall Clock** is a feature-rich application that displays the current time with additional functionalities such as sound effects, light and dark mode color schemes, and the ability to remember user preferences.

---

## Features

### 1. Real-Time Clock

- Displays the current time with three clock hands: hour, minute, and second.
- Updates in real-time to ensure precise timekeeping.

### 2. Sound Effects

- Option to enable or disable clock ticking sound effects.
- Emits a ticking sound every second when enabled.

### 3. Color Scheme

- Offers a choice between light and dark mode for the clock’s appearance.
- Saves the selected color scheme in the browser's local storage for consistent user experience across sessions.

### 4. Error Handling

- Handles errors related to audio initialization, sound playback, and local storage gracefully.
- Displays errors in a dismissible error message box.

---

## Getting Started

### Prerequisites

Ensure you have a modern web browser that supports:

- **SVG** for rendering the clock’s graphics.
- **JavaScript** for real-time updates and interactivity.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/waiz3ple/wall-clock.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd wall-clock
   ```
3. **Run the application**:
   ```bash
   npm run dev
   ```
   Ensure you have Node.js installed on your machine.

---

## Usage

- **Sound Toggle**: Use the "Toggle Sound" switch to enable or disable ticking sound effects.
- **Color Scheme Toggle**: Use the "Toggle Color Scheme" switch to switch between dark and light modes.
- **Error Messages**: Any errors (e.g., audio initialization failure) are displayed in the error message box. Click "Close" to dismiss the messages.

---

## Preview

View a live demo of the clock here: [Live Demo](https://waiz3ple.github.io/wall-clock)

---

## Customization

### Ticking Sound

- Replace the `tick-tock.wav` file in the `sounds` folder with your desired audio file to use a custom ticking sound.
- Ensure the new file is in a compatible format, such as **WAV**.

### Appearance

- Customize the clock’s design by editing the `styles.css` file.

### Error Handling

- Enhance error handling and logging by updating the error-handling functions in the JavaScript file.

---

## License

This project is open-source and licensed under the [MIT License](LICENSE).

**Please do not claim this project as your own.**

---

## Author

- **Wasiu Ramoni**
- GitHub: [@waiz3ple](https://github.com/waiz3ple)

---

## Contact

Feel free to reach out with questions, suggestions, or feedback:
- **Twitter**: [@waiz3ple](https://x.com/waiz3ple)
- **Telegram**: [t.me/waiz3ple](https://t.me/waiz3ple)
