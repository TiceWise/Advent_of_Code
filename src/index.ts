import { getAoCInputData } from './utils/getAoCInputData'
import { AoC2023Day3 } from './2023/day3/day3'

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()
// convert string array to number array items = rawItems.split(', ').map(Number);
// get ascii 'c'.charCodeAt(0)
// deepcopy: const originalMonkeys = JSON.parse(JSON.stringify(monkeys))

// each character
// for (let i = 0; i < str.length; i++) {
//   const curChar = str.charAt(i)
// }

getAnswer()

async function getAnswer() {
  const day = 3
  const year = 2023
  process.stdout.write(`input for day ${day} (${year})... `)
  const input: string = await getAoCInputData(day, year)
  console.log(`received! Calculating...`)
  const answer = AoC2023Day3(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}
