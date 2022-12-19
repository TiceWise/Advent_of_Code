import { Answer } from '../models/models'

function isNumber(n: any): boolean {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0) && !Array.isArray(n)
}

enum Result {
  right = 'RIGHT',
  wrong = 'WRONG',
}

function getOrder(leftInput: any, rightInput: any): Result | undefined {
  let result = undefined
  while (leftInput.length && rightInput.length && !result) {
    let leftVal = leftInput.shift()
    let rightVal = rightInput.shift()

    // compare numbers
    if (isNumber(leftVal) && isNumber(rightVal)) {
      if (leftVal < rightVal) {
        // right order
        return Result.right
      }
      if (leftVal > rightVal) {
        // wrong order
        return Result.wrong
      }
      // else if one is exactly one number and the other is an array, wrap the number in an array
    } else if (Array.isArray(leftVal) && isNumber(rightVal)) {
      rightVal = [rightVal]
    } else if (isNumber(leftVal) && Array.isArray(rightVal)) {
      leftVal = [leftVal]
    }

    // if both are an array, go deeper
    if (Array.isArray(leftVal) && Array.isArray(rightVal)) {
      result = getOrder(leftVal, rightVal)
      if (result) {
        return result
      }
    }
  }

  // if one list ran out, we know the order
  if (!leftInput.length && rightInput.length) {
    return Result.right
  } else if (!rightInput.length && leftInput.length) {
    return Result.wrong
  }
}

export function AoC2022Day13(input: string): Answer {
  const dataIn = input.split('\n')

  dataIn.pop()

  const linesPerPair = 3
  const numberOfPairs = Math.floor(dataIn.length / linesPerPair)

  let sumIndices = 0
  const indices = []
  const packets = []

  const packet2 = '[[2]]'
  const packet6 = '[[6]]'
  packets.push(packet2)
  packets.push(packet6)

  for (let i = 0; i <= numberOfPairs; i++) {
    const left = dataIn[i * linesPerPair]
    const right = dataIn[i * linesPerPair + 1]

    const leftParsed = JSON.parse(left)
    const rightParsed = JSON.parse(right)

    const order = getOrder(leftParsed, rightParsed)

    packets.push(left)
    packets.push(right)

    if (order === Result.right) {
      indices.push(i + 1)
      sumIndices += i + 1
    }
  }

  let track2 = 0
  let track6 = 0
  let lastIndex = packets.length - 2

  while (lastIndex > 1) {
    for (let i = 0; i <= lastIndex; i++) {
      const leftParsed = JSON.parse(packets[i])
      const rightParsed = JSON.parse(packets[i + 1])
      // console.log(`comparing ${i}: ${leftParsed} with ${i + 1}: ${rightParsed}`)

      const order = getOrder(leftParsed, rightParsed)

      if (order === Result.wrong) {
        const temp: any = packets[i]
        packets[i] = packets[i + 1]
        packets[i + 1] = temp
      }
    }
    lastIndex--
  }

  track2 = packets.findIndex((packet) => packet === packet2) + 1
  track6 = packets.findIndex((packet) => packet === packet6) + 1

  return {
    answerQuestion1: sumIndices,
    answerQuestion2: track2 * track6,
  }
}
