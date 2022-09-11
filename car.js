class Car {
  constructor(x, y, width, height, controlType, maxSpeed = 3) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    // Movement
    this.speed = 0
    this.acceleration = 0.2
    this.maxSpeed = maxSpeed
    this.friction = 0.05
    this.angle = 0
    // add damage
    this.damage = false

    // pass car to this
    this.sensor = new Sensor(this)

    this.controls = new Controls(controlType)
  }

  //update location Method

  update(roadBorders) {
    // Do not allow car to move if damaged
    if (!this.damaged) {
      this.#move()
      this.polygon = this.#createPolygon()
      // detect if damage is done to car
      this.damaged = this.#assessDamage(roadBorders)
      // update sensor
    }
    this.sensor.update(roadBorders)
  }

  #assessDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true
      }
    }
    return false
  }

  // Detecting corners of cars
  // Adjust points of cars by multiplying x and y rads by x amount
  #createPolygon() {
    const points = []
    // rad = radius-> with hypotenuse method
    const rad = Math.hypot(this.width, this.height) / 2
    // finding angle between center of car and ray using arc tangent
    const alpha = Math.atan2(this.width, this.height)
    // top right corner
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    })
    // top left corners
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    })
    // bottom right corner
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    })
    // bottom left corner
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    })
    return points
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2
    }
    if (this.speed > 0) {
      this.speed -= this.friction
    }

    if (this.speed < 0) {
      this.speed += this.friction
    }
    // Fix constant movement of car
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1
      if (this.controls.left) {
        this.angle += 0.03 * flip
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip
      }
    }

    this.x -= Math.sin(this.angle) * this.speed
    this.y -= Math.cos(this.angle) * this.speed
  }

  draw(ctx) {
    if (this.damaged) {
      ctx.fillStyle = 'gray'
    } else {
      ctx.fillStyle = 'black'
    }
    ctx.beginPath()
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
    }
    ctx.fill()

    // draw sensor
    this.sensor.draw(ctx)
  }
}
