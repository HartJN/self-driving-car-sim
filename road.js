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

    // Create lanes -> value of laneCount = 3
    for (let i = 0; i <= this.laneCount; i++) {
      // find x co-ord of each vertical lane using linear interpolation.
      const x = lerp(this.left, this.right, i / this.laneCount)

      // Create line dashes on center lines.
      if (i > 0 && i < this.laneCount) {
        ctx.setLineDash([20, 20])
      } else {
        ctx.setLineDash([])
      }
      // Draw lines
      ctx.beginPath()
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom)
      ctx.stroke()
    }
  }
}
