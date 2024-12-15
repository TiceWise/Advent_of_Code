import { Answer } from '../../models/models'

export function AoC2024Day12(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const [p1, p2] = stringArray[0].split(' ').map(Number)

  const answerQuestion1 = p1
  const answerQuestion2 = p2

  return { answerQuestion1, answerQuestion2 }
}
