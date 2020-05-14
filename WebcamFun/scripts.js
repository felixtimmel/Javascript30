const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const video = document.querySelector('.player');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap')

let redStyle = false;
let split = false;
let ghost = false;
let greenS = false;

getVideo = () => {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('Problem with your webcam, you hould probably allow it', err)
    })
}

toggleRedStyle = () => {
  redStyle = !redStyle;
}

toggleSplit = () => {
  split = !split;
}

toggleGhost = () => {
  ghost = !ghost;
}

toggleGreenScreen = () => {
  greenS = !greenS;
  const rgbClass = document.querySelector('.rgb')
  console.log(rgbClass)
  rgbClass.classList.toggle('hide')
}

paintToCanvas = (e) => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
      // take the pixels
      let pixels = ctx.getImageData(0, 0, width, height);
      // Make fun stuff with them
      if (redStyle) { pixels = redEffect(pixels);}
      if (split) { pixels = rgbSplit(pixels);}
      if (greenS) { pixels = greenScreen(pixels);}
      ghost ? ctx.globalAlpha = 0.1 : ctx.globalAlpha = 1;  
      // Put them back
      ctx.putImageData(pixels, 0, 0);
  }, 16)
}

takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  //take the data from the canvas
  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data} alt="handsome man" />`;
  strip.insertBefore(link, strip.firstChild)
}

redEffect = (pixels) => {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //RED
    pixels.data[i + 1] = pixels.data[i + 1] - 100; //GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //BLUE
  }
  return pixels;
}

rgbSplit = (pixels) => {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; //RED
    pixels.data[i + 500] = pixels.data[i + 1]; //GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; //BLUE
  }
  return pixels;
}

greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value
  });

  for(let i = 0; i < pixels.data.length; i+=4) {
    red = pixels.data[i + 0]; //RED
    green = pixels.data[i + 1]; //GREEN
    blue = pixels.data[i + 2]; //BLUE
    alpha = pixels.data[i + 3]; //ALPHA

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
      }
  }
  return pixels;
}

getVideo();
video.addEventListener('canplay', paintToCanvas)