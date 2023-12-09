import { Answer } from '../../models/models'

function diff(A: number[]) {
  return A.slice(1).map(function (n, i) {
    return n - A[i]
  })
}

export function AoC2023Day9(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  let answerQuestion1 = 0
  let answerQuestion2 = 0

  stringArray.forEach((line) => {
    const history = line.split(' ').map(Number)
    const historySequence: number[][] = []
    let currentHistory = history
    historySequence.push(currentHistory)

    while (!currentHistory.every((hist) => hist === 0)) {
      currentHistory = diff(currentHistory)
      historySequence.push(currentHistory)
    }

    historySequence.at(-1)!.push(0)
    for (let i = historySequence.length - 2; i >= 0; i--) {
      historySequence[i].push(historySequence[i].at(-1)! + historySequence[i + 1].at(-1)!)
      historySequence[i].unshift(historySequence[i].at(0)! - historySequence[i + 1].at(0)!)
    }

    answerQuestion1 += historySequence[0].at(-1)!
    answerQuestion2 += historySequence[0][0]
  })

  return { answerQuestion1, answerQuestion2 }
}
