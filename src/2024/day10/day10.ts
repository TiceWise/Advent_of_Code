import { Answer } from '../../models/models'

function stepUp(
  numArray: number[][],
  r: number,
  c: number,
  start: number,
  result: Set<string>
): Set<string> {
  // console.log(`${r},${c},${start}`)
  if (start === 9) {
    result.add(`${r},${c}`)
    return result
  }

  // look up down left right, if 1, follow that path
  if (r - 1 >= 0 && numArray[r - 1][c] === start + 1) {
    stepUp(numArray, r - 1, c, start + 1, result)
  }
  if (r + 1 < numArray.length && numArray[r + 1][c] === start + 1) {
    stepUp(numArray, r + 1, c, start + 1, result)
  }
  if (c - 1 >= 0 && numArray[r][c - 1] === start + 1) {
    stepUp(numArray, r, c - 1, start + 1, result)
  }
  if (c + 1 < numArray[r].length && numArray[r][c + 1] === start + 1) {
    stepUp(numArray, r, c + 1, start + 1, result)
  }

  return result
}

function stepDown(
  numArray: number[][],
  r: number,
  c: number,
  end: number,
  result: string[]
): string[] {
  // console.log(`${r},${c},${start}`)
  if (end === 0) {
    result.push(`${r},${c}`)
    return result
  }

  // look up down left right, if 1, follow that path
  if (r - 1 >= 0 && numArray[r - 1][c] === end - 1) {
    stepDown(numArray, r - 1, c, end - 1, result)
  }
  if (r + 1 < numArray.length && numArray[r + 1][c] === end - 1) {
    stepDown(numArray, r + 1, c, end - 1, result)
  }
  if (c - 1 >= 0 && numArray[r][c - 1] === end - 1) {
    stepDown(numArray, r, c - 1, end - 1, result)
  }
  if (c + 1 < numArray[r].length && numArray[r][c + 1] === end - 1) {
    stepDown(numArray, r, c + 1, end - 1, result)
  }

  return result
}

export function AoC2024Day10(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  // for each zero, check how many 9's they reach

  const stringArray = input.split('\n')

  const numArray: number[][] = []
  stringArray.forEach((row) => {
    numArray.push([...row].map(Number))
  })

  let count = 0
  let countQ2 = 0

  numArray.forEach((row, r) => {
    row.forEach((char, c) => {
      const start = 0
      if (char === start) {
        // console.log(`${r},${c},${start}`)
        const result = stepUp(numArray, r, c, start, new Set<string>())
        count += result.size
        // console.log(result)
      }

      const end = 9
      if (char === end) {
        const result = stepDown(numArray, r, c, end, [])
        countQ2 += result.length
      }
    })
  })

  return { answerQuestion1: count, answerQuestion2: countQ2 }
}
