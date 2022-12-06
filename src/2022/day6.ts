import { Answer } from '../models/models'

function isUnique(str: string) {
  // we could add an extra check, that the length is also the messageLength
  return new Set(str).size == str.length
}

function getUniqueXPos(dataIn: string, messageLength: number): number {
  for (let i = messageLength; i < dataIn.length; i++) {
    const startMessagePos = i - messageLength
    // const endMessagePos = i

    if (isUnique(dataIn.slice(startMessagePos, i))) {
      return i
    }
  }
  return 0
}

export function AoC2022Day6(input: string): Answer {
  return { answerQuestion1: getUniqueXPos(input, 4), answerQuestion2: getUniqueXPos(input, 14) }
}
