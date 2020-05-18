let countdown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const input = document.customForm;

timer = (seconds) => {
  clearInterval(countdown);
  const time = Date.now();
  const then = time + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

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
  timeLeft.textContent = display;
  document.title = display;
}

displayEndTime = (timestamp) => {
  let time = new Date(timestamp);
  const hour = time.getHours();
  const min = time.getMinutes();
  endTime.textContent = `Be back at ${hour}:${min}`;
}

buttons.forEach(btn => btn.addEventListener('click', (e) => {
  timer(parseInt(e.currentTarget.dataset.time));
}));

input.addEventListener('submit', (e) => {
  e.preventDefault();
  timer(input.minutes.value * 60);
  input.minutes.value = '';
});