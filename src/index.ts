import { getAoCInputData } from './utils/getAoCInputData'
import { AoC2022Day14 } from './2022/day14';

// useful functions
// descending: numberArray.sort((a, b) => b - a)
// ascending: numberArray.sort((a, b) => a - b)
// alphabetically: numberArray.sort()
// convert string array to number array items = rawItems.split(', ').map(Number);
// get ascii 'c'.charCodeAt(0)
// deepcopy: const originalMonkeys = JSON.parse(JSON.stringify(monkeys))

// const input = fs
//   .readFileSync('/Users/thijsdegroot/WebstormProjects/AoC2022/src/utils/Question10_NAVARAmac.txt', {
//     encoding: 'utf8',
//   })
//   .toString()

getAnswer()

async function getAnswer() {
  const day = 14
  const year = 2022
  const input: string = await getAoCInputData(day, year)
  const answer = AoC2022Day14(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}
