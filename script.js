// Constants and global variables
const secHand = document.querySelector('#secHand');
const minHand = document.querySelector('#minHand');
const hourHand = document.querySelector('#hourHand');
const toggleColor = document.querySelector('#toggle-color');
const btnBox = document.querySelector('.switches-container');
const errorBox = document.querySelector('.error-container');
const coords = [-128, -154]; // SVG circle center point
let audio;
let errMessages = [];

/*      <== functions ==>     */
// Initialize audio, handling any errors
function initAudio() {
    try {
        audio = new Audio('./sounds/tick-tock.wav');
    } catch (error) {
        logError(`Error initializing audio: ${error}`);
    }
}

// Handle clock rotation
function clock() {
    const time = new Date();
    const sec = time.getSeconds();
    const min = time.getMinutes();
    const hour = time.getHours() % 12 || 12; // Compressed to 12-hours format
    //clock hands degrees, check for detail calculation ==>  https://github.com/waiz3ple/wall-clock/blob/master/docs/Clock%20Hands.pdf
    const secR = sec * 6;
    const minR = min * 6 + sec / 10;
    const hrR = hour * 30 + min / 2 + sec / 120;
   
    rotate(secHand, secR);
    rotate(minHand, minR);
    rotate(hourHand, hrR);
}

// Rotate clock hands
function rotate(hand, degrees) {
    const [xAxis, yAxis] = coords;
    hand.setAttribute('transform', `rotate(${degrees}, ${xAxis}, ${yAxis})`);
}

// Play clock ticking sound, handling any errors
function playSound() {
    try {
        if (audio) {
            audio.play();
            if (typeof audio.loop === 'boolean') audio.loop = true;
        }
    } catch (error) {
        logError(`Error playing sound: ${error}`);
    }
}

// Apply color scheme
function applyColorScheme(scheme = 'dark') {
    const root = document.documentElement;
    root.setAttribute('data-theme', scheme);
}

// Set color scheme in local storage
function setLocalStorage(scheme = 'dark') {
    try {
        localStorage.setItem('settings', JSON.stringify({ scheme }));
    } catch (error) {
        logError(`Error setting scheme in localStorage: ${error}`);
    }
}

// Retrieve user's last preferred color scheme and apply it
function retrieveScheme() {
    try {
        const color = JSON.parse(localStorage.getItem('settings'));
        if (color && color.scheme === 'dark') {
            applyColorScheme('dark');
            toggleColor.checked = true;
        }
    } catch (error) {
        logError(`Error retrieving scheme from localStorage: ${error}`);
    }
}

// Event listeners
btnBox.addEventListener('change', function (event) {
    if (event.target.classList.contains('toggle-sound')) {
        event.target.checked ? playSound() : audio.pause();
    }
    if (event.target.classList.contains('toggle-color')) {
        const colorScheme = event.target.checked ? 'dark' : 'light';
        applyColorScheme(colorScheme);
        setLocalStorage(colorScheme);
    }
});

// Log an error message and add it to the error messages array
function logError(message) {
    console.error(message);
    errMessages.push(message);
}

// Print error messages and clear the error box
function printErrorMessage(errMsgs) {
    let html = `
       <ul>
         ${errMsgs.map(err => {
            return `<li>${err}</li>`;
         }).join('')}
       </ul>
       <div class="close" onclick="clearErrors()">close</div>
    `;

    if (errMsgs.length) {
        errorBox.innerHTML = ''; // Clear previous errors
        errorBox.insertAdjacentHTML('beforeend', html);
    }
}

// Clear errors and the error box
function clearErrors() {
    errMessages = [];
    errorBox.innerHTML = ''; // Clear the error box
}

// Initialize audio, clock, and color scheme
initAudio();
clock();
setInterval(clock, 1000);
retrieveScheme();
printErrorMessage(errMessages);
