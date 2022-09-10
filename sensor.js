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

    // Border collision detection
    this.readings = []
  }

  update(roadBorders) {
    // creates rays

    this.#castRays()

    // initialise readings array.
    this.readings = []
    // iterate through all rays and push to readings array
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders))
    }
  }

  // Detect where ray touches road borders
  #getReading(ray, roadBorders) {
    // find where ray touches border
    let touches = []

    // iterate through borders
    for (let i = 0; i < roadBorders.length; i++) {
      // getIntersection returns values x, y, offset. offset = distance between center of car and border.
      const touch = getIntersection(
        // segment 1
        ray[0],
        ray[1],
        // segment 2
        roadBorders[i][0],
        roadBorders[i][1]
      )
      if (touch) {
        touches.push(touch)
      }
    }
    // if no touches happen (no reading) return null
    if (touches.length == 0) {
      return null
    } else {
      // place all offsets into one array.
      const offsets = touches.map(e => e.offset)
      // find minimum offset
      const minOffset = Math.min(...offsets)
      return touches.find(e => e.offset == minOffset)
    }
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
