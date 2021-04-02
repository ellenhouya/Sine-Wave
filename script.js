function init() {
  particleArray = [];

  for (i = 0; i < Math.floor(innerWidth / 4); i++) {
    const canvasWidth = canvas.width + 300;
    const canvasHeight = canvas.height + 300;
    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;
    const radius = Math.random() * 2.5;

    particleArray.push(new Particle(x, y, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = `rgba(10, 10, 10, ${alpha})`;

  c.fillRect(0, 0, canvas.width, canvas.height);

  drawStars();

  alpha = Math.abs(Math.cos(radians * 6));

  fillStyleColor = `rgb(${colorR}, ${colorG}, ${colorB})`;

  // if dark background
  if (alpha >= 0.8 && alpha <= 1) {
    handleDarkBkg();
  } else {
    handleMixBlend("normal");
    handleImgBackground();
  }

  c.beginPath();
  c.moveTo(0, canvas.height / 2);
  for (let i = 0; i < canvas.width; i++) {
    c.fillStyle = fillStyleColor;
    // c.fillStyle = gradient;

    let movingBkgY =
      wave.y -
      i * 0.5 +
      Math.sin(i * wave.length + increment) *
        wave.amplitude *
        Math.sin(increment);

    // c.fillStyle = c.createPattern(beachImg, "no-repeat");

    c.fillRect(i, movingBkgY, 1, canvas.height / 0.9);
  }

  increment += wave.frequency;
}
init();
animate();

addEventListener("resize", (e) => {
  init();
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  if (canvas.width > 1800) {
    wave.y = 1300;
  } else {
    wave.y = canvas.height / 2 + 500;
  }
});
