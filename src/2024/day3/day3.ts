import { Answer } from '../../models/models'

export function AoC2024Day3(input: string): Answer {
  const mulReg = /mul\((?<left>\d+),(?<right>\d+)\)/gi

  let match: RegExpExecArray | null

  let sumQ1 = 0

  while ((match = mulReg.exec(input)) !== null) {
    const { left, right } = match.groups ?? {}
    sumQ1 += Number(left) * Number(right)
    // console.log(`Left: ${left}, Right: ${right}`)
  }

  const doArrays = input.split('do()')

  let sumQ2 = 0

  doArrays.forEach((doArr) => {
    const [doThisPart, _] = doArr.split("don't()")

    while ((match = mulReg.exec(doThisPart)) !== null) {
      const { left, right } = match.groups ?? {}
      sumQ2 += Number(left) * Number(right)
      // console.log(`Left: ${left}, Right: ${right}`)
    }
  })

  return { answerQuestion1: sumQ1, answerQuestion2: sumQ2 }
}
