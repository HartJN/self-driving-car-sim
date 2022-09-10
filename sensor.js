// Creates sensors for detecting position

class Sensor {
  constructor(car) {
    this.car = car
    // amount of rays
    this.rayCount = 5
    // length of rays
    this.rayLength = 150
    // angle of the rays. 90deg
    this.raySpread = Math.PI / 2

    // store each ray
    this.rays = []
  }

  update(roadBorders) {
    // creates rays
    this.#castRays()
  }
  #castRays() {
    // create empty array
    this.rays = []
    // populate rays[]
    for (let i = 0; i < this.rayCount; i++) {
      // use lerp to figure out angle of each ray.
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle

      // start point of ray
      const start = { x: this.car.x, y: this.car.y }
      // End point of ray
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      }
      // push start and end points into array to form segment
      this.rays.push([start, end])
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = 'yellow'
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y)
      ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y)
      ctx.stroke()
    }
  }
}
