class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x
    this.width = width
    this.laneCount = laneCount

    this.left = x - width / 2
    this.right = x + width / 2

    // infinite road
    const infinity = 1000000
    this.top = -infinity
    this.bottom = infinity
  }

  // Draw Road

  draw(ctx) {
    ctx.lineWidth = 5
    ctx.strokeStyle = 'white'

    // Draw line on left side
    ctx.beginPath()
    ctx.moveTo(this.left, this.top)
    ctx.lineTo(this.left, this.bottom)
    ctx.stroke()

    // Draw line on right side
    ctx.beginPath()
    ctx.moveTo(this.right, this.top)
    ctx.lineTo(this.right, this.bottom)
    ctx.stroke()
  }
}
