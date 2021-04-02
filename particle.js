class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.opacity = 1;
    this.color = `rgba(${getRandomNum_floor(0, 255)}, ${getRandomNum_floor(
      0,
      255
    )},${getRandomNum_floor(0, 255)}, ${this.opacity})`;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}
