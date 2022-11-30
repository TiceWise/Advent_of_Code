import { getAoCInputData } from '../utils/getAoCInputData'

interface Incr {
  rightIncr: number
  downIncr: number
}

export async function AoC2020Day3() {
  const day = 3
  const input = await getAoCInputData(day, 2020)
  const stringArray = input.split('\n')

  console.log(stringArray)

  const rightIncr = 3
  const downIncr = 1

  const noTrees = countTrees({ rightIncr, downIncr }, stringArray)

  console.log(`answer day ${day}.1: ${noTrees}`)

  const incrs: Incr[] = [
    { rightIncr: 1, downIncr: 1 },
    { rightIncr: 3, downIncr: 1 },
    { rightIncr: 5, downIncr: 1 },
    { rightIncr: 7, downIncr: 1 },
    { rightIncr: 1, downIncr: 2 },
  ]

  const trees: number[] = incrs.map((incr) => countTrees(incr, stringArray))

  const noTotTrees = trees.reduce((accum, current) => accum * current, 1)
  console.log(`answer day ${day}.2: ${noTotTrees}`)
}

function countTrees(incr: Incr, stringArray: string[]) {
  let noTrees = 0
  let x = 0
  let y = 0

  const noRows = stringArray.length
  const noCols = stringArray[0].length

  while (y < noRows) {
    const pos = stringArray[y][x % noCols]
    if (pos === '#') {
      noTrees++
    }
    x += incr.rightIncr
    y += incr.downIncr
  }
  return noTrees
}

export async function AoC2020Day2() {
  const day = 2
  const input = await getAoCInputData(day, 2020)
  const stringArray = input.split('\n')

  stringArray.pop()

  interface PasswordPolicy {
    min: number
    max: number
    letterToCheck: string
    password: string
  }

  const data: PasswordPolicy[] = stringArray.map((inString) => {
    const [leftPart, rightPart] = inString.split(': ')
    const [range, letter] = leftPart.split(' ')
    const [minStr, maxStr] = range.split('-')
    return {
      password: rightPart,
      letterToCheck: letter,
      min: parseInt(minStr),
      max: parseInt(maxStr),
    }
  })

  let numberOfValid = 0
  data.forEach((datapoint) => {
    const charCount = (datapoint.password.match(new RegExp(datapoint.letterToCheck, 'g')) || []).length
    if (charCount >= datapoint.min && charCount <= datapoint.max) {
      // valid
      numberOfValid++
    }
  })

  console.log(`answer day ${day}.1: ${numberOfValid}`)

  let numberOfValid2 = 0
  data.forEach((datapoint) => {
    const firstChar = datapoint.password[datapoint.min - 1]
    const secondChar = datapoint.password[datapoint.max - 1]

    if (
      (firstChar === datapoint.letterToCheck || secondChar === datapoint.letterToCheck) &&
      !(firstChar === datapoint.letterToCheck && secondChar === datapoint.letterToCheck)
    ) {
      numberOfValid2++
    }
  })
  console.log(`answer day ${day}.2: ${numberOfValid2}`)
}

export async function AoC2020Day1() {
  const input = await getAoCInputData(1, 2020)
  const stringArray = input.split('\n')

  const numberArray = stringArray.map((inputStr) => parseInt(inputStr))
  for (let i = 0; i < stringArray.length; i++) {
    for (let j = i + 1; j < stringArray.length; j++) {
      if (numberArray[i] + numberArray[j] === 2020) {
        console.log(`answer day 1.1: ${numberArray[i] * numberArray[j]}`)
      }
      for (let k = j + 1; k < stringArray.length; k++) {
        if (numberArray[i] + numberArray[j] + numberArray[k] === 2020) {
          console.log(`answer day 1.2: ${numberArray[i] * numberArray[j] * numberArray[k]}`)
        }
      }
    }
  }
}
