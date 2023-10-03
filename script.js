/*  <== Constants and global variables ==>     */
const secHand = document.querySelector('#secHand');
const minHand = document.querySelector('#minHand');
const hourHand = document.querySelector('#hourHand');
const toggleColor = document.querySelector('#toggle-color');
const btnBox = document.querySelector('.switches-container');
const errorBox = document.querySelector('.error-container');
const settingIcon = document.querySelector('.setting-icon');
const coords = [-1, 5]; // SVG circle center point from [0,0]
let errMessages = [];
let audio;


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
    //Angle of rotation, check the docs/ folder for the calculation detail
    const secR = sec * 6;
    const minR = min * 6 + sec / 10;
    const hrR = hour * 30 + min / 2 + sec / 120;
   
    rotate(secHand, secR);
    rotate(minHand, minR);
    rotate(hourHand, hrR);
}

// Rotate clock hands
function rotate(hand, angle) {
    const [xAxis, yAxis] = coords;
    hand.setAttribute('transform', `rotate(${angle}, ${xAxis}, ${yAxis})`);
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
function applyColorScheme(theme = 'dark') {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
}

// Set color scheme in local storage
function setLocalStorage(theme = 'dark') {
    try {
        localStorage.setItem('theme', JSON.stringify({ theme }));
    } catch (error) {
        logError(`Error setting theme in localStorage: ${error}`);
    }
}

// Retrieve user's last preferred color scheme and apply it
function retrieveScheme() {
    try {
        const savedColor = JSON.parse(localStorage.getItem('theme'));
        if (savedColor && savedColor.theme === 'dark') {
            applyColorScheme('dark');
            toggleColor.checked = true;
        }
    } catch (error) {
        logError(`Error retrieving theme from localStorage: ${error}`);
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
         displayCurrentTheme('.sound label', colorScheme);
    }
});

/* working on toggle visiblity*/
function toggleVisibility(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.style.visibility = element.style.visibility === 'visible' ? 'hidden' : 'visible';
  }
}
settingIcon.addEventListener('click', () => toggleVisibility('.switches-container'));


// Log an error message and add it to the error messages array
function logError(message) {
    console.error(message);
    errMessages.push(message);
}

// Print error messages and clear previous logged errors 
function displayErrorMessage(errMsgs) {
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

//initialize clock
clock();
//keep clock in real time
setInterval(clock, 1000);
// Initialize audio, clock, and color scheme
initAudio();
// retrieve user's last prefrence color scheme and apply
retrieveScheme();
// log and print all errors
displayErrorMessage(errMessages);

function displayCurrentTheme(selector, currTheme){
    const element = document.querySelector(selector);
    element.textContent = currTheme.slice(0,1).toUpperCase() + currTheme.slice(1) + ' mode';
}