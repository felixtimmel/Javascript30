let countdown;
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole'); 
const timecontent = document.querySelector('.timeleft');
const time = document.querySelector('.timeleft__countdown')

randTime = (min,max) => {
  return Math.round(Math.random() * (max-min) + min);
}

let lastHole;
let timeUp = false;
let score = 0;

randHole = (holes) => {
  const index = Math.round(Math.random() * (holes.length -1));
  console.log(index);
  const hole = holes[index];
  if (hole === lastHole) {
    return randHole(holes);
  }
  lastHole = hole;
  return hole;
}

peep = () => {
  const time = randTime(300,1000);
  const hole = randHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  duration = 10000;
  score = 0;
  timecontent.classList.remove('hide');
  timer(duration);
  peep();
  setTimeout(() => {
    timeUp = true;
  }, duration)

}

points = (e) => {
  if (!e.isTrusted) return;
  score ++;
  console.log(e.path[1])
  e.path[1].classList.remove('up');
  scoreBoard.textContent = score;
}

timer = (miliseconds) => {
  clearInterval(countdown);
  const time = Date.now();
  const then = time + miliseconds;
  displayTimeLeft(miliseconds / 1000);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    displayTimeLeft(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
};

displayTimeLeft = (miliseconds) => {
  const remaindersSeconds = miliseconds;
  const remaindersMiliSeconds = miliseconds % 1000;
  const display = `${remaindersSeconds < 10 ? '0' : ''}${remaindersSeconds}`;
  time.textContent = display;
}


moles.forEach(mole => mole.addEventListener('click', points));