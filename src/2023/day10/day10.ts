import { Answer } from '../../models/models'

export function AoC2023Day10(input: string): Answer {
  const stringArray = input.split('\n')

  stringArray.pop()

  const answerQuestion1 = 10
  const answerQuestion2 = 20

  return { answerQuestion1, answerQuestion2 }
}
