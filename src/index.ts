import { getAoCInputData } from './utils/getAoCInputData'
import { Answer } from './models/models'
import { AoC2022Day5 } from './2022/day5'

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()

// getAnswer()

async function getAnswer() {
  const day = 5
  const year = 2022
  const input: string = await getAoCInputData(day, year)
  const answer: Answer = AoC2022Day5(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}
