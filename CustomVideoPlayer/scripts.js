const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const playBtn = player.querySelector('.player__controls .toggle')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const dataSkip = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = document.getElementById('fullscreen')

video.autoplay = true;

togglePlay = () => {
  video.paused ? video.play() : video.pause();
}

toggleBtn = () => {
  video.paused ? playBtn.innerText = '►' : playBtn.innerText = '❚❚';
}

skip = (e) => {
  video.currentTime += parseFloat(e.currentTarget.dataset.skip);
}

handleChange = (e) => {
  const item = e.currentTarget
  video[item.name] = item.value;
}

handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

moveVideo = (e) => {
  const setTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = setTime
}

fullScreen = () => {
  player.classList.toggle('fullscreen')
}

playBtn.addEventListener('click', togglePlay)
fullscreen.addEventListener('click', fullScreen)
video.addEventListener('click', togglePlay)
video.addEventListener('play', toggleBtn)
video.addEventListener('pause', toggleBtn)
video.addEventListener('timeupdate', handleProgress)
dataSkip.forEach(btn => btn.addEventListener('click', skip))
ranges.forEach(input => input.addEventListener('change', handleChange))
ranges.forEach(input => input.addEventListener('mousemove', handleChange))

let mouseDown = false;
progress.addEventListener('click', moveVideo)
progress.addEventListener('mousemove', (e) => mouseDown && moveVideo(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)