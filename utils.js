const gui = new dat.GUI();
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const pInfo = document.getElementById("para").getBoundingClientRect();

const {
  bottom: pBottom,
  height: pHeight,
  left: pLeft,
  right: pRight,
  top: pTop,
  width: pWidth,
  x,
  y,
} = pInfo;

const wave = {
  x: canvas.width / 2,
  y: canvas.height / 2 + 470,
  length: 0.006,
  amplitude: 100,
  frequency: 0.01,
};

const strokeColor = {
  h: 200,
  s: 50,
  l: 50,
};

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

gui.hide();

const waveFolder = gui.addFolder("wave");

waveFolder.add(wave, "y", 0, canvas.height + 500);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "frequency", -0.01, 1);

const strokeFolder = gui.addFolder("stroke");
strokeFolder.add(strokeColor, "h", 0, 255);
strokeFolder.add(strokeColor, "s", 0, 100);
strokeFolder.add(strokeColor, "l", 0, 100);

const backgroundFolder = gui.addFolder("background");
backgroundFolder.add(backgroundColor, "r", 0, 255);
backgroundFolder.add(backgroundColor, "g", 0, 255);
backgroundFolder.add(backgroundColor, "b", 0, 255);
backgroundFolder.add(backgroundColor, "a", 0, 1);

let increment = wave.frequency;

let particleArray;

let radians = 0;
let alpha = 1;
let mouseDown = false;
let gradient = c.createLinearGradient(
  0,
  canvas.height / 3,
  canvas.width,
  canvas.height
);

const textCon = document.querySelector(".textCon");
const textCon2 = document.querySelector(".textCon2");

let colorReduction = 0.8;
let colorGReduction = 0.4;

let colorR = 255;
let colorG = 255;
let colorB = 255;

let fillStyleColor = `rgb(${colorR}, ${colorG}, ${colorB})`;

function getRandomNum_floor(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawStars() {
  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(radians);
  particleArray.forEach((particle) => {
    particle.draw();
  });
  c.restore();

  radians += 0.0008;
}

function handleMixBlend(mixBlendValue) {
  document.querySelectorAll(".textContainer").forEach((textCon) => {
    textCon.style.mixBlendMode = mixBlendValue;
  });
}

function handleDarkBkg() {
  setTimeout(() => {
    handleMixBlend("difference");
  }, 500);

  if (colorR < 255) {
    colorR += 2;
    colorG += 1;
    colorB += 2;
  }
}

function reduceColorValue(value, greenValue) {
  colorReduction = value;
  colorGReduction = greenValue;
}

function handleImgBackground() {
  if (alpha >= 0.1 && alpha < 0.8) {
    colorR -= colorReduction;
    colorG -= colorGReduction;
    colorB -= colorReduction;

    if (colorR <= 150) {
      reduceColorValue(0.1, 0.05);
    } else {
      reduceColorValue(3.2, 1.6);
    }
  }
}
