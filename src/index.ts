import { getAoCInputData } from './utils/getAoCInputData'
import { AoC2022Day7 } from './2022/day7'

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()

getAnswer()

async function getAnswer() {
  const day = 7
  const year = 2022
  const input: string = await getAoCInputData(day, year)
  const answer = AoC2022Day7(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}
