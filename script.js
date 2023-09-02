const secHand = document.querySelector('#secHand');
const minHand = document.querySelector('#minHand');
const hourHand = document.querySelector('#hourHand');
const audio = new Audio('./sounds/tick-tock.wav');
const btnBox = document.querySelector('.switches--container');

function clock() {
	const time = new Date();
	const sec = time.getSeconds();
	const min = time.getMinutes();
	const hour = time.getHours() > 12 ? time.getHours() - 12 : time.getHours(); // compress to 12hrs

	//rotations : I explain this calculations in the docs folder
	const secR = sec * 6; //  x 360°
	const minR = min * 6 + sec / 10; //
	const hrR = hour * 30 + min / 2 + sec / 120; //

	rotate(secHand, secR);
	rotate(minHand, minR);
	rotate(hourHand, hrR);
}

function rotate(hand, degrees) {
	hand.setAttribute('transform', `rotate(${degrees}, -128, -154)`);
}
clock();
setInterval(clock, 1000);

//____________light mode and sound___________

//watching all checkboxes via event delegation
btnBox.addEventListener('change', function (event) {
	//sound switch
	if (event.target.classList.contains('toggle-sound')) {
		event.target.checked ? playSound() : audio.pause(); //after cooling off
	}
	//mode switch
	if (event.target.classList.contains('toggle-mode')) {
		event.target.checked ? darkMode() : lightMode();
	}
});

function playSound() {
	audio.play();
	if (typeof audio.loop === 'boolean') audio.loop = true;
}

const classGroup = (selector) =>
	Array.from(document.querySelectorAll(selector));

function darkMode() {
	classGroup(`[class^="st"]`).forEach((element) => {
		const lightClass = element
			.getAttribute('class')
			.split(' ')
			.find((cl) => {
				if (cl.startsWith('st') && !cl.endsWith('--darkMode')) return cl;
			});
		element.classList.toggle(`${lightClass}--darkMode`);
		element.classList.toggle(`${lightClass}`);
	});
}

function lightMode() {
	classGroup(`[class$="--darkMode"]`).forEach((element) => {
		const lightClass = element
			.getAttribute('class')
			.split(' ')
			.find((cl) => cl.endsWith('--darkMode'))
			.replace('--darkMode', '');
		element.classList.toggle(`${lightClass}`);
		element.classList.toggle(`${lightClass}--darkMode`);
	});
}
