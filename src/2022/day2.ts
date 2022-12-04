import { Answer } from '../models/models'

export function AoC2022Day2(input: string): Answer {
  const games = input.split('\n')

  let totalScore = 0
  let totalNewScore = 0

  games.forEach((game) => {
    const [opponent, me] = game.split(' ')

    interface OutcomeMap {
      [key: string]: string
    }

    // first column: opponent
    // A rock
    // B paper
    // C scissors
    // plus outcome: 0 lost, 3 draw, 6 won

    // second column: what i must play
    // X Rock, 1
    // Y paper, 2
    // Z scissors, 3

    const handMap: OutcomeMap = {
      A: 'rock',
      B: 'paper',
      C: 'scissors',
      X: 'rock',
      Y: 'paper',
      Z: 'scissors',
    }

    if (handMap[me] == 'rock') {
      totalScore += 1
    }
    if (handMap[me] == 'paper') {
      totalScore += 2
    }
    if (handMap[me] == 'scissors') {
      totalScore += 3
    }

    if (handMap[opponent] == 'rock') {
      if (handMap[me] == 'rock') {
        totalScore += 3
      }
      if (handMap[me] == 'paper') {
        totalScore += 6
      }
    }
    if (handMap[opponent] == 'paper') {
      if (handMap[me] == 'paper') {
        totalScore += 3
      }
      if (handMap[me] == 'scissors') {
        totalScore += 6
      }
    }
    if (handMap[opponent] == 'scissors') {
      if (handMap[me] == 'rock') {
        totalScore += 6
      }
      if (handMap[me] == 'scissors') {
        totalScore += 3
      }
    }

    // PART 2

    const outcomeMap: OutcomeMap = {
      X: 'lose',
      Y: 'draw',
      Z: 'win',
    }

    // 1 rock, 2 paper, 3 scissors

    if (handMap[opponent] == 'rock') {
      if (outcomeMap[me] == 'lose') {
        // scisors
        totalNewScore += 3
      }
      if (outcomeMap[me] == 'draw') {
        // rock
        totalNewScore += 1 + 3
      }
      if (outcomeMap[me] == 'win') {
        // paper
        totalNewScore += 2 + 6
      }
    }
    if (handMap[opponent] == 'paper') {
      if (outcomeMap[me] == 'lose') {
        // rock
        totalNewScore += 1
      }
      if (outcomeMap[me] == 'draw') {
        // paper
        totalNewScore += 2 + 3
      }
      if (outcomeMap[me] == 'win') {
        // scis
        totalNewScore += 3 + 6
      }
    }
    if (handMap[opponent] == 'scissors') {
      if (outcomeMap[me] == 'lose') {
        // paper
        totalNewScore += 2
      }
      if (outcomeMap[me] == 'draw') {
        // sciss
        totalNewScore += 3 + 3
      }
      if (outcomeMap[me] == 'win') {
        // rock
        totalNewScore += 1 + 6
      }
    }
  })

  return { answerQuestion1: totalScore, answerQuestion2: totalNewScore }
}
