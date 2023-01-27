/* Ball.js Guide:
Here we have the Ball Class.
It contains the following methods ("functions"):
  1- rest() --> this is placed inside the constructor as well, used to reset the ball X & Y & Velocity values 
  2- We have getters and setters for X, Y coordinates from the css file.
  3- To confine the ball distance from the window, we have a rect() "rectangle" that provids info about the window/client "view port"
  4- an updateBall method to update the direction & vecloity of the ball. 
*/

const INITIAL_VELOCITY = 0.03;
const VELOCITY_INCREASE_BY = 0.00001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset(); // call the reset when you call any ball object
  }

  rect() {
    // we want the position relative to the view port, thus client
    // properties such as top, bottom, left, right
    return this.ballElement.getBoundingClientRect();
  }

  //functions that define the position x & y from CSS properties:
  get x() {
    // getComputedStyle --> returns CSSProperties object with all CSS code
    // getPropertyValue, we want a certain property in the object, --> returned string
    // so we convert the string to a float, to work with numbers :)
    const computedStyle = getComputedStyle(this.ballElement);
    // console.log('the computedStyle', computedStyle); // for testing
    // console.log('getproperty',typeof(computedStyle.getPropertyValue('--x')) );
    // console.log('float', parseFloat(computedStyle.getPropertyValue('--x')));
    return parseFloat(computedStyle.getPropertyValue("--x"));
  }
  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  get y() {
    // I'll do it in one line here, since I don't need the entire computedSytle
    const yProperty = getComputedStyle(this.ballElement).getPropertyValue(
      "--y"
    );
    // console.log(yProperty);
    return parseFloat(yProperty);
  }
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  reset() {
    this.x = 50; // original position (calles the set and gives it a 10)
    this.y = 50; // original position
    // to calculate the direction:
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x <= 0.3) ||
      Math.abs(this.direction.x >= 0.9)
    ) {
      // directions in X-Y: 0-360 degrees, we're using rads: 0-2PI
      // because vector calculus/statics/etc, prefer using cos,sins to find x,y
      //https://cdn.kastatic.org/ka-perseus-images/d0775d40442799ccf598fb126c169534f5d1b2ae.png
      const vectorHead = randomNumber(0, 2 * Math.PI); // this is the angle of the vector, you can define x,y of unit vector based on it
      this.direction = {
        x: Math.cos(vectorHead),
        y: Math.sin(vectorHead),
      };
    }
    this.velocity = INITIAL_VELOCITY;
  }
  // update the ball position & velocity depending on differnce between frames
  updateBall(detlaTime, paddleRects) {
    // basically: position = speed * time
    // thus new X position = (old position) + (unit vector*velocity*time)
    this.x += this.direction.x * this.velocity * detlaTime;
    this.y += this.direction.y * this.velocity * detlaTime;
    this.velocity += VELOCITY_INCREASE_BY;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumber(minNum, maxNum) {
  return Math.random() * (maxNum - minNum) + minNum;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}

// notes about the position, this is more of vector calculus rather than coding:
// unit vectors has a magnitude (Value) of 1, their only usage is pointing towards the direction of a vector. in 2D a unit vector is:
//https://www.youtube.com/watch?v=f5DHYCKyVRo
// using the unit vector, we can control the direction of the ball without changing vecloity, since the unit vector value is 1
// unit vectory * velocity => control direction with veocity speed
