import { Answer } from '../models/models'

export function AoC2022Day10(input: string): Answer {
  const dataIn = input.split('\n')

  let X = 1
  let cycle = 0
  let signalSum = 0

  const displayWidth = 40
  const displayHeight = 6

  const display = [...Array(displayHeight)].map(() => Array(displayWidth).fill('.'))

  function doCycleAndCalculateSignal() {
    // start of cycle
    // sprite location is X - 1 through X + 1
    // drawing pixel: cycle % 40 of row Math.floor cycle / 40
    const pixel = cycle % displayWidth
    const displayRow = Math.floor(cycle / 40)

    if (pixel >= X - 1 && pixel <= X + 1) {
      display[displayRow][pixel] = '#'
    }

    cycle++

    // end of cycle
    if (cycle % displayWidth === displayWidth / 2) {
      signalSum += X * cycle
    }
  }

  // process cycles
  for (let i = 0; i < dataIn.length; i++) {
    if (dataIn[i] === 'noop') {
      // noop takes one cycle to complete. It has no other effect.
      doCycleAndCalculateSignal()
    } else {
      // addx V takes two cycles to complete.
      // After two cycles, the X register is increased by the value V. (V can be negative.)
      const [, amount] = dataIn[i].split(' ')
      doCycleAndCalculateSignal()
      doCycleAndCalculateSignal()
      X += parseInt(amount)
    }
  }

  // print display
  for (let i = 0; i < display.length; i++) {
    console.log(display[i].join(''))
  }

  return { answerQuestion1: signalSum, answerQuestion2: 0 }
}
