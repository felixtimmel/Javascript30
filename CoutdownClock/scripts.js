let countdown;
const timeLeft = document.querySelectorAll('.display__time-left');

timer = (seconds) => {
  clearInterval(countdown);
  const time = Date.now();
  const then = time + seconds * 1000;

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTimeLeft(secondsLeft);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
};

displayTimeLeft = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const remaindersSeconds = seconds % 60;
  const display = `${mins < 10 ? '0' : ''}${mins}:${remaindersSeconds < 10 ? '0' : ''}${remaindersSeconds}`;
  console.log(display)
  timeLeft.textContent = display;
}