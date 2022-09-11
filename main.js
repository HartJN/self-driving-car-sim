const canvas = document.getElementById('myCanvas')
canvas.height = window.innerHeight
canvas.width = 200

const ctx = canvas.getContext('2d')
const road = new Road(canvas.width / 2, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, 'AI')
// add array of cars(traffic)
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, 'DUMMY', 2)]

//animate car

animate()

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, [])
  }
  car.update(road.borders, traffic)

  canvas.height = window.innerHeight

  // save state of canvas
  ctx.save()
  // creates camera effect. "Road moves instead of car"
  ctx.translate(0, -car.y + canvas.height * 0.7)
  road.draw(ctx)

  // draw traffic cars
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, 'red')
  }
  car.draw(ctx, 'blue')

  ctx.restore()
  requestAnimationFrame(animate)
}
