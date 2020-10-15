const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

let duration; 
// Get the permieter of the circle and lowers it every 50 milliseconds
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset',
        perimeter * timeRemaining / duration - perimeter
    );
    
  },
  onComplete() {
    console.log('Timer is completed');
  }
});