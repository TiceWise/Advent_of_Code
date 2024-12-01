import { Answer } from '../../models/models'
import { abs } from 'mathjs'

const frequency = (arr: number[], item: number) => {
  return arr.filter((x) => x === item).length
}

export function AoC2024Day1(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  // const [p1, p2] = stringArray[0].split('   ').map(Number) //??

  const left: number[] = []
  const right: number[] = []
  stringArray.forEach((row) => {
    const [n1, n2] = row.split('   ').map(Number)
    left.push(n1)
    right.push(n2)
  })

  const leftSorted = left.sort()
  const rightSorted = right.sort() //??

  let sum = 0

  leftSorted.forEach((int, ind) => {
    sum += abs(int - rightSorted[ind])
  })

  let sim = 0
  left.forEach((l) => {
    sim += frequency(right, l) * l //?
  })
  // const answerQuestion2 = p2

  return { answerQuestion1: sum, answerQuestion2: sim }
}
