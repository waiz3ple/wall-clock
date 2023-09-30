/*programming paradigm: functional*/

const secHand = document.querySelector('#secHand');
const minHand = document.querySelector('#minHand');
const hourHand = document.querySelector('#hourHand');
const audio = new Audio('./sounds/tick-tock.wav');
const btnBox = document.querySelector('.switches-container');
const coords = [-128, -154]; //from the svg center point

function clock() {
    const time = new Date();
    const sec  =  time.getSeconds();
    const min  =  time.getMinutes();
    const hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours(); // compress to 12hrs

    //Calculations: check ==> https://github.com/waiz3ple/wall-clock/blob/master/docs/Clock%20Hands.pdf
    const secR = sec * 6; 
    const minR = min * 6 + sec / 10; //
    const hrR = hour * 30 + min / 2 + sec / 120; //

    rotate(secHand, secR);
    rotate(minHand, minR);
    rotate(hourHand, hrR);
}

function rotate(hand, degrees) {
    const [xAxis, yAxis] = coords
    hand.setAttribute('transform', `rotate(${degrees}, ${xAxis}, ${yAxis})`);
}

clock();
setInterval(clock, 1000);

//____________light mode and sound___________

//event delegation 
btnBox.addEventListener('change', function (event) {
    //sound switch
    if (event.target.classList.contains('toggle-sound')) {
        event.target.checked ? playSound() : audio.pause(); 
    }
    //switch color scheme
    if (event.target.classList.contains('toggle-color')) {
        event.target.checked ? applyColorScheme('dark'): applyColorScheme('light');
    }
});

function playSound() {
    audio.play();
    if (typeof audio.loop === 'boolean') audio.loop = true;
}

function applyColorScheme(scheme='dark'){
    const root = document.documentElement;
    root.setAttribute('data-theme', scheme)
 }
