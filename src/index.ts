import { getAoCInputData } from './utils/getAoCInputData'

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()

export function AoC2022DayX(input: string): Answer {
  let answerQuestion1 = 0
  let answerQuestion2 = 0

  return { answerQuestion1, answerQuestion2 }
}

getAnswer()

async function getAnswer() {
  const day = 2
  const year = 2022
  const input = await getAoCInputData(day, year)
  const answer = AoC2022Day2(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}

interface Answer {
  answerQuestion1: number
  answerQuestion2: number
}

export function AoC2022Day2(input: string): Answer {
  let answerQuestion1 = 0
  let answerQuestion2 = 0

  return { answerQuestion1, answerQuestion2 }
}

export function AoC2022Day1(input: string): Answer {
  let answerQuestion1 = 0
  let answerQuestion2 = 0

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

  answerQuestion1 = Math.max(...sumCals)

  const sortedCalories = sumCals.sort((a, b) => b - a)

  answerQuestion2 = sortedCalories[0] + sortedCalories[1] + sortedCalories[2]

  return { answerQuestion1, answerQuestion2 }
}
