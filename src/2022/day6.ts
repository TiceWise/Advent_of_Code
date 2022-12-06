import { Answer } from '../models/models'

function getUnique4Pos(dataIn: string): number {
  for (let i = 3; i < dataIn.length; i++) {
    const pos0 = dataIn[i - 3]
    const pos1 = dataIn[i - 2]
    const pos2 = dataIn[i - 1]
    const pos3 = dataIn[i]

    console.log(pos0)
    if (pos0 !== pos1 && pos0 !== pos2 && pos0 !== pos3 && pos1 !== pos2 && pos1 !== pos3 && pos2 !== pos3) {
      return i
    }
  }
  return 0
}

function getUniqueXPos(dataIn: string, messageLength: number): number {
  for (let i = messageLength - 1; i < dataIn.length; i++) {
    const startMessagePos = i - messageLength + 1
    const endMessagePos = i

    let sameLetterFound = false

    // we start with the longest message, also check each smaller message
    for (let j = endMessagePos; j >= startMessagePos; j--) {
      if (dataIn.slice(startMessagePos, j).includes(dataIn[j])) {
        sameLetterFound = true
        break
      }
    }

    if (!sameLetterFound) {
      return i
    }
  }
  return 0
}

export function AoC2022Day6(input: string): Answer {
  return { answerQuestion1: getUniqueXPos(input, 4) + 1, answerQuestion2: getUniqueXPos(input, 14) + 1 }
}
