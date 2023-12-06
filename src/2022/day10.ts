import { Answer } from '../models/models'

export function AoC2022Day10(input: string): Answer {
  const dataIn = input.split('\n')

  let X = 1
  let cycle = 0
  let signalSum = 0

  const displayWidth = 40
  const displayHeight = 6

  const display = [...Array(displayHeight)].map(() => Array(displayWidth).fill(' '))
  const displayBit = [...Array(displayHeight)].map(() => Array(displayWidth).fill(0))

  function doCycleAndCalculateSignal() {
    // start of cycle
    // sprite location is X - 1 through X + 1
    // drawing pixel: cycle % 40 of row Math.floor cycle / 40
    const pixel = cycle % displayWidth
    const displayRow = Math.floor(cycle / 40)

    if (pixel >= X - 1 && pixel <= X + 1) {
      display[displayRow][pixel] = '#'
      displayBit[displayRow][pixel] = 1
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

  /* Don't plot each time this is run
  // export type ColorScale = string | string[] | Array<[number, string]>;
  const colorscale: Array<[number, string]> = [
    [0, '#000B3B'],
    [1, '#3665FF'],
  ]

  const layout: Layout = {
    autosize: false,
    margin: { t: 25, b: 25, l: 25, r: 25 },
  }

  // const config: Config = { fillFrame: true }

  const data: Plot[] = [{ z: displayBit.reverse(), type: 'heatmap', colorscale, showscale: false }]
  plot(data, layout)
  */

  return { answerQuestion1: signalSum, answerQuestion2: 0 }
}
