import { Answer } from '../../models/models'

// function generateSum(numbersArray): number[] {
//
//   const firstNum = numbersArray.shift()
//
//   firstNum + generateSum(numbersArray)
//   firstNum * generateSum(numbersArray)
//
// }

export function AoC2024Day7(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  stringArray.forEach((row) => {
    const [resultRaw, valsRaw] = row.split(': ')
    const result = Number(resultRaw)
    const vals = valsRaw.split(' ')

    // brute force
    console.log('a')
    console.log('b')
  })

  return { answerQuestion1: 0, answerQuestion2: 1 }
}
