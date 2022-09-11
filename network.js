// neuronCounts = array of neurons in each layer
class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = []
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]))
    }
  }

  static feedForward(givenInputs, network) {
    let outputs = Level.feedForward(givenInputs, network.levels[0])
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i])
    }
    return outputs
  }

  static mutate(network, amount = 1) {
    network.levels.forEach(level => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount)
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = lerp(
            level.weights[i][j],
            Math.random * 2 - 1,
            amount
          )
        }
      }
    })
  }
}

// Creates weights
class Level {
  constructor(inputCount, outputCount) {
    this.inputs = new Array(inputCount)
    this.outputs = new Array(outputCount)
    // each output neuron has a biases. an output at which it will fire.
    this.biases = new Array(outputCount)

    // connecting every input to out.
    this.weights = []
    // for each input node, there is an outputCount amount of connections.
    for (let i = 0; i < inputCount; i++) {
      // create empty array, the size of outputCount
      this.weights[i] = new Array(outputCount)
    }

    Level.#randomise(this)
  }

  static #randomise(level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1
    }
  }
  // computer output values using feed forward algorithm

  static feedForward(givenInputs, level) {
    // goes through all level inputs and sets the to inputs from sensor
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i]
    }
    // loop through every output
    for (let i = 0; i < level.outputs.length; i++) {
      // calc sum between values of input and weights
      let sum = 0
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i]
      }
      if (sum > level.biases[i]) {
        level.outputs[i] = 1
      } else {
        level.outputs[i] = 0
      }
    }
    return level.outputs
  }
}
