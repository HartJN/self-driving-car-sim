const carCanvas = document.getElementById('carCanvas')
carCanvas.width = 200
const networkCanvas = document.getElementById('networkCanvas')
networkCanvas.width = 300

// carCanvas.height = window.innerHeight

const carCtx = carCanvas.getContext('2d')
const networkCtx = networkCanvas.getContext('2d')
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9)
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

  carCanvas.height = window.innerHeight
  networkCanvas.height = window.innerHeight

  // save state of canvas
  carCtx.save()
  // creates camera effect. "Road moves instead of car"
  carCtx.translate(0, -car.y + carCanvas.height * 0.7)
  road.draw(carCtx)

  // draw traffic cars
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(carCtx, 'red')
  }
  car.draw(carCtx, 'blue')

  carCtx.restore()

  Visualiser.drawNetwork(networkCtx, car.brain)
  requestAnimationFrame(animate)
}
