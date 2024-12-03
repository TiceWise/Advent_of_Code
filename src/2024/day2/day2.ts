import { Answer } from '../../models/models'
import { abs } from 'mathjs'

function isSafe(curVal: number, nextVal: number, increasingArray: boolean) {
  let safe = true
  const diff = abs(curVal - nextVal)
  const increasing = curVal < nextVal
  if (increasingArray !== increasing) {
    safe = false
  }
  if (diff > 3) {
    safe = false
  }
  if (diff === 0) {
    safe = false
  }
  return safe
}

export function AoC2024Day2(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  let safeCount = 0
  let safeQ2Count = 0

  stringArray.forEach((row) => {
    const items = row.split(' ').map(Number)

    const increasingArray = items[0] < items[items.length - 1] //??

    let safe = true

    // Q1
    for (let i = 0; i < items.length - 1; i++) {
      const curVal = items[i]
      const nextVal = items[i + 1]
      safe = isSafe(curVal, nextVal, increasingArray)
      if (!safe) {
        break
      }
    }

    if (safe) {
      safeCount += 1 //??
    }

    // Q2
    let safeQ2 = true
    let strike1 = false
    for (let i = 0; i < items.length - 1; i++) {
      const curVal = items[i]
      let nextVal = items[i + 1]
      safeQ2 = isSafe(curVal, nextVal, increasingArray)
      if (!safeQ2 && strike1) {
        break
      }
      if (!safeQ2 && !strike1 && i === items.length - 2) {
        safeQ2 = true
        break
      }
      if (!safeQ2 && !strike1) {
        strike1 = true
        safeQ2 = true
        nextVal = items[i + 2] // try skipping current value
        safeQ2 = isSafe(curVal, nextVal, increasingArray)
        if (safeQ2) {
          i += 2
        } else {
          break
        }
      }
    }

    if (safeQ2) {
      safeQ2Count += 1
    }
  })

  return { answerQuestion1: safeCount, answerQuestion2: safeQ2Count }
}
