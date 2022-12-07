import { Answer } from '../models/models'

export function AoC2022Day8(input: string): Answer {
  const dataIn = input.split('\n')

  // remove last '\n' line
  dataIn.pop()

  return { answerQuestion1: 0, answerQuestion2: 0 }
}
