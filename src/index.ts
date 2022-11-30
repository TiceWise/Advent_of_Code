import { getAoCInputData } from './utils/getAoCInputData'

// getAnswer()

async function getAnswer() {
  const day = 1
  const year = 2022
  const input = await getAoCInputData(day, year)
  const answer = AoC2022Day1(input)
  console.log(`answer day ${day}.1: ${answer.answerQuestion1}`)
  console.log(`answer day ${day}.2: ${answer.answerQuestion2}`)
}

interface Answer {
  answerQuestion1: number
  answerQuestion2: number
}

export function AoC2022Day1(input: string): Answer {
  let answerQuestion1 = 0
  let answerQuestion2 = 0

  const stringArray = input.split('\n')
  const numberArray = stringArray.map((inputStr) => parseInt(inputStr))
  for (let i = 0; i < stringArray.length; i++) {
    for (let j = i + 1; j < stringArray.length; j++) {
      if (numberArray[i] + numberArray[j] === 2020) {
        answerQuestion1 = numberArray[i] * numberArray[j]
      }
      for (let k = j + 1; k < stringArray.length; k++) {
        if (numberArray[i] + numberArray[j] + numberArray[k] === 2020) {
          answerQuestion2 = numberArray[i] * numberArray[j] * numberArray[k]
        }
      }
    }
  }

  return { answerQuestion1, answerQuestion2 }
}
