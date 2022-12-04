import { Answer } from '../models/models'

export function AoC2022Day1(input: string): Answer {
  const stringArray = input.split('\n')
  const numberArray = stringArray.map((inputStr) => parseInt(inputStr))

  let totCal = 0
  const sumCals: number[] = []

  numberArray.forEach((calorie) => {
    // blank line = NaN is new elf
    if (isNaN(calorie)) {
      sumCals.push(totCal)
      totCal = 0
    } else {
      totCal += calorie
    }
  })

  const answerQuestion1 = Math.max(...sumCals)

  const sortedCalories = sumCals.sort((a, b) => b - a)

  const answerQuestion2 = sortedCalories[0] + sortedCalories[1] + sortedCalories[2]

  return { answerQuestion1, answerQuestion2 }
}
