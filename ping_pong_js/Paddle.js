const PADDLE_SPEED = 0.03;

export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.reset();
  }

  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }

  get position() {
    const position = getComputedStyle(this.paddleElement).getPropertyValue(
      "--position"
    );
    return parseFloat(position);
  }

  updatePaddle(detlaTime, ballYPosition) {
    this.position += PADDLE_SPEED * detlaTime * (ballYPosition - this.position);
  }

  rect() {
    return this.paddleElement.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }
}
