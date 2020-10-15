class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    // Lowers every 50 milliseconds
    this.interval = setInterval(this.tick, 50);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    //   will stop the clock when it reaches 0 
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
        // Lowers the time for every 50 millisecond
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    //   This will show the countdown number to only two decimals after
    this.durationInput.value = time.toFixed(2);
  }
}