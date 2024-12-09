import { Answer } from '../../models/models'

export function AoC2024Day5(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const [ruling, updateLines] = input.split('\n\n')

  const rules = ruling.split('\n')
  const updates = updateLines.split('\n')

  const rulesParsed: number[][] = []

  rules.forEach((rule) => {
    const [sm, lg] = rule.split('|').map(Number)

    rulesParsed.push([sm, lg])
  })

  let ansQ1 = 0
  let ansQ2 = 0
  updates.forEach((update) => {
    const updatePageNumbers = update.split(',').map(Number)

    let correct = true
    for (let i = 0; i < updatePageNumbers.length - 1; i++) {
      for (let j = i + 1; j < updatePageNumbers.length; j++) {
        // console.log(updatePageNumbers[i], updatePageNumbers[j])
        rulesParsed.forEach((rule) => {
          if (updatePageNumbers[i] === rule[1] && updatePageNumbers[j] === rule[0]) {
            correct = false
          }
        })
        if (!correct) {
          break
        }
      }
      if (!correct) {
        break
      }
    }

    if (correct) {
      // console.log(updatePageNumbers)
      // console.log(updatePageNumbers.length)
      ansQ1 += updatePageNumbers[(updatePageNumbers.length - 1) / 2]
    }

    if (!correct) {
      // swap broken rule, begin again, until correct, then get number
      let correct = false
      while (!correct) {
        correct = true
        for (let i = 0; i < updatePageNumbers.length - 1; i++) {
          for (let j = i + 1; j < updatePageNumbers.length; j++) {
            // console.log(updatePageNumbers[i], updatePageNumbers[j])
            rulesParsed.forEach((rule) => {
              if (updatePageNumbers[i] === rule[1] && updatePageNumbers[j] === rule[0]) {
                correct = false

                // destruct swapping:
                ;[updatePageNumbers[i], updatePageNumbers[j]] = [
                  updatePageNumbers[j],
                  updatePageNumbers[i],
                ]
              }
            })
            if (!correct) {
              break
            }
          }
          if (!correct) {
            break
          }
        }
      }

      ansQ2 += updatePageNumbers[(updatePageNumbers.length - 1) / 2]
    }
  })
  return { answerQuestion1: ansQ1, answerQuestion2: ansQ2 }
}
