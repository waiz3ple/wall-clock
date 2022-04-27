const secHand = document.querySelector('#secHand');
const minHand = document.querySelector('#minHand');
const hourHand = document.querySelector('#hourHand');
const audio = new Audio('./sounds/tick-tock.wav');
const btnBox = document.querySelector('.switches--container');
const toggleClasses = ['body', 'st1', 'st2','st3', 'st5', 'st6', 'st7', 'st9', 'st10'];
//console.log(hourHand)

function clock(){
    const  degConstant = 6 //  (x/60) x 360° 
    const time = new Date();
    const secRotation = time.getSeconds() *  degConstant // frotation
    const minRotation = time.getMinutes()  * degConstant + (secRotation/60);
     const hours  = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    const hourRotation = (hours / 12) * 360 + (minRotation/60) 

   rotate(secHand,  secRotation,  [-125,-158]);  
   rotate(minHand,  minRotation,  [-125,-158]);
   rotate(hourHand, hourRotation, [-125,-158]);
} //first good guess  [-130,170]

function rotate(hand, handRotation, coords){
    //hand.setAttribute('transform', `rotate(${handRotation})`);
   hand.setAttribute('transform', `rotate(${handRotation},${coords.join(',')})`);
}
clock();
setInterval(clock, 1000)


//____________light mode and sound___________

//watching all checkboxes via event delegation
btnBox.addEventListener('change', function(event){ 
      //sound switch
    if(event.target.classList.contains('toggle-sound')){
           event.target.checked ? playSound() : audio.pause(); //after cooling off
    }
     //mode switch
    if(event.target.classList.contains('toggle-mode')){
        event.target.checked ? darkMode() : lightMode(); 
    }
})

function playSound(){
    audio.play();
    if(typeof audio.loop ==='boolean') audio.loop = true;
}

function darkMode(){
     toggleClasses.forEach(tgClass => {
        document.querySelectorAll(`.${tgClass}`).forEach(element => {
            element.classList.toggle(`${tgClass}`)
            element.classList.toggle(`${tgClass}--darkMode`)
        })
     })
}

function lightMode(){
    const darkElements = Array.from(document.querySelectorAll(`[class$="--darkMode"]`));
        darkElements.forEach(element =>{
           const lightModeClass = element.getAttribute('class').split(' ').find(el => el.includes('--darkMode')).replace('--darkMode','')
          element.classList.toggle(`${lightModeClass}`)
          element.classList.toggle(`${lightModeClass}--darkMode`)
        })    
}