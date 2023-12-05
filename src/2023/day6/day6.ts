import { Answer } from '../../models/models'

export function AoC2023Day6(input: string): Answer {
  // remove last '\n'
  if (input.lastIndexOf('\n') === input.length - 1) {
    input = input.slice(0, -1)
  }

  const stringArray = input.split('\n')

  const answerQuestion1 = 10
  const answerQuestion2 = 20

  return { answerQuestion1, answerQuestion2 }
}
