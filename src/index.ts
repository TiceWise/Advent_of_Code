import { getAoCInputData } from './utils/getAoCInputData'
import { AoC2023Day12 } from './2023/day12/day12'

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()
// convert string array to number array items = rawItems.split(', ').map(Number);
// get ascii 'c'.charCodeAt(0)
// deepcopy: const originalMonkeys = JSON.parse(JSON.stringify(monkeys))
// fill array with ones: const arr = new Array(stringArray.length).fill(1)

// each character
// for (let i = 0; i < str.length; i++) {
//   const curChar = str.charAt(i)
// }

getAnswer()

async function getAnswer() {
  const day = 12
  const year = 2023
  process.stdout.write(`input for day ${day} (${year})... `)
  const input: string = await getAoCInputData(day, year)
  console.log(`received! Calculating...`)
  console.time('Calculation time')
  const answer = AoC2023Day12(input)
  console.timeEnd('Calculation time')
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}
