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
  const day = 3
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

export function AoC2022Day3(input: string): Answer {
  let answerQuestion1 = 0
  let answerQuestion2 = 0

  return { answerQuestion1, answerQuestion2 }
}

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
