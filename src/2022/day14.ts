import { Answer } from '../models/models'

export function AoC2022Day14(input: string): Answer {
  const dataIn = input.split('\n')

  dataIn.pop()

  let minX = Infinity
  let maxX = -Infinity

  let minY = Infinity
  let maxY = -Infinity

  dataIn.forEach((line) => {
    const corners = line.split(' -> ')
    corners.forEach((corner) => {
      const [x, y] = corner.split(',').map(Number)

      if (x < minX) {
        minX = x
      }
      if (x > maxX) {
        maxX = x
      }
      if (y < minY) {
        minY = y
      }
      if (y > maxY) {
        maxY = y
      }
    })
  })

  // everything shifts - minX to the left
  const xIn = 500 - minX
  const yIn = 0

  const sandArray = [...Array(maxY + 1)].map(() => Array(maxX - minX + 1).fill('.'))

  dataIn.forEach((line) => {
    const corners = line.split(' -> ')
    for (let i = 0; i < corners.length - 1; i++) {
      const [xStart, yStart] = corners[i].split(',').map(Number)
      const [xEnd, yEnd] = corners[i + 1].split(',').map(Number)

      // draw rock rows
      if (yStart === yEnd) {
        const xSmall = Math.min(xStart, xEnd)
        const xLarge = Math.max(xStart, xEnd)
        sandArray[yStart] = sandArray[yStart].fill('#', xSmall - minX, xLarge - minX + 1)
      }
      // draw rock columns
      if (xStart === xEnd) {
        const ySmall = Math.min(yStart, yEnd)
        const yLarge = Math.max(yStart, yEnd)
        for (let y = ySmall; y <= yLarge; y++) {
          sandArray[y] = sandArray[y].fill('#', xStart - minX, xStart - minX + 1)
        }
      }
    }
  })

  // draw input point
  sandArray[yIn] = sandArray[yIn].fill('+', xIn, xIn + 1)

  const sandArrayPart2 = JSON.parse(JSON.stringify(sandArray))

  let endlessFall = false
  let sandCount = 0

  while (!endlessFall) {
    // produce sand
    let atRest = false
    let y = yIn
    let x = xIn

    while (!atRest && !endlessFall) {
      // fall down one step if possible
      if (sandArray[y + 1][x] === '.') {
        y++
      } else if (sandArray[y + 1][x - 1] === '.') {
        y++
        x--
      } else if (sandArray[y + 1][x + 1] === '.') {
        y++
        x++
      } else {
        if (x > 0 && x < maxX - minX) {
          // else the sand comes to rest
          sandArray[y][x] = 'o'
          sandCount++
          atRest = true
        }
      }

      if (x <= 0 || x >= maxX - minX) {
        endlessFall = true
      }
    }
  }

  // ======= Part 2 =========

  // we add two lines below, so we have a new maxY
  const newMaxY = maxY + 2
  // pad left and right with dots, max width = newMaxY*2 + 1, so with padding each side with newMaxY we should be fine
  for (let k = 0; k < sandArrayPart2.length; k++) {
    sandArrayPart2[k] = [...Array(newMaxY).fill('.'), ...sandArrayPart2[k], ...Array(newMaxY).fill('.')]
  }

  // add the new bottom rows
  sandArrayPart2.push([...Array(newMaxY).fill('.'), ...Array(maxX - minX + 1).fill('.'), ...Array(newMaxY).fill('.')])
  sandArrayPart2.push([...Array(newMaxY).fill('#'), ...Array(maxX - minX + 1).fill('#'), ...Array(newMaxY).fill('#')])

  let atTipOfTop = false
  let sandCountPart2 = 0

  while (!atTipOfTop) {
    // produce sand
    let atRest = false
    let y = yIn
    let x = xIn + newMaxY // new drop point location

    while (!atRest && !atTipOfTop) {
      // fall down one step if possible
      if (sandArrayPart2[y + 1][x] === '.') {
        y++
      } else if (sandArrayPart2[y + 1][x - 1] === '.') {
        y++
        x--
      } else if (sandArrayPart2[y + 1][x + 1] === '.') {
        y++
        x++
      } else {
        // else the sand comes to rest
        sandArrayPart2[y][x] = 'o'
        sandCountPart2++
        atRest = true
      }

      if (atRest && x === xIn + newMaxY && y === yIn) {
        atTipOfTop = true
      }
    }
  }

  // draw
  // for (let k = 0; k < sandArrayPart2.length; k++) {
  //   console.log(sandArrayPart2[k].join(''))
  // }

  return {
    answerQuestion1: sandCount,
    answerQuestion2: sandCountPart2,
  }
}
