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
    }

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

// When t = 0 ->  value = A
// When t = 1 -> value = B
// if A, t, B -> difference = half of difference.
function lerp(A, B, t) {
  return A + (B - A) * t
}
