import { Answer } from '../../models/models'

export function AoC2024Day7(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  let ansQ1 = 0
  let ansQ2 = 0

  stringArray.forEach((row) => {
    const [resultRaw, valsRaw] = row.split(': ')
    const result = Number(resultRaw)
    const stringArray = valsRaw.split(' ')
    const numbersArray = [...stringArray].map(Number)

    const firstNum: number = numbersArray.shift()!
    let options = [firstNum]
    while (numbersArray.length > 0) {
      const newOptions: number[] = []
      const curNum: number = numbersArray.shift()!
      options.forEach((option) => {
        newOptions.push(option + curNum)
        newOptions.push(option * curNum)
      })
      options = newOptions
    }

    if (options.some((option) => option === result)) {
      ansQ1 += result
    }

    // Q2
    const firstStr: string = stringArray.shift()!
    let optionsQ2: string[] = [firstStr]
    while (stringArray.length > 0) {
      const newOptions: string[] = []
      const curStr: string = stringArray.shift()!
      optionsQ2.forEach((option) => {
        newOptions.push((Number(option) + Number(curStr)).toString())
        newOptions.push((Number(option) * Number(curStr)).toString())
        newOptions.push(option + curStr)
      })
      optionsQ2 = newOptions
    }

    if (optionsQ2.some((option) => option === result.toString())) {
      ansQ2 += result
    }
  })

  return { answerQuestion1: ansQ1, answerQuestion2: ansQ2 }
}
