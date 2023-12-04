import { Answer } from '../../models/models'

export function AoC2023Day4(input: string): Answer {
  const stringArray = input.split('\n')

  stringArray.pop()

  let totalScore = 0
  const numberOfMatches = new Array(stringArray.length).fill(1)

  stringArray.forEach((card, index) => {
    const [, numbers] = card.split(': ')
    const [winning, having] = numbers.split(' | ')
    const winningNumbers = winning.split(' ').map(Number)
    const havingNumbers = having.split(' ').map(Number)

    let score = 0
    let numOfMatch = 0

    havingNumbers.forEach((having) => {
      // Number parses single digits (e.g. " 6") with a 0 for the first space, so ignore those
      if (winningNumbers.includes(having) && having !== 0) {
        numOfMatch += 1
        if (score === 0) {
          score = 1
        } else {
          score = score * 2
        }
      }
    })
    for (let i = 1; i <= numOfMatch; i++) {
      numberOfMatches[index + i] += numberOfMatches[index]
    }
    totalScore += score
  })

  const answerQuestion1 = totalScore
  const answerQuestion2 = numberOfMatches.reduce((sum, current) => sum + current, 0)

  return { answerQuestion1, answerQuestion2 }
}
