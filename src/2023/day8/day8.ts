import { Answer } from '../../models/models'

function greatestCommonDivisor(a: number, b: number): number {
  return b ? greatestCommonDivisor(b, a % b) : a
}

function leastCommonMultiple(a: number, b: number): number {
  return a * (b / greatestCommonDivisor(a, b))
}

function findLeastCommonMultiple(numArray: number[]): number {
  let multiple = numArray[0]
  numArray.forEach((n) => {
    multiple = leastCommonMultiple(multiple, n)
  })
  return multiple
}

export function AoC2023Day8(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const directions = stringArray.shift()!
  stringArray.shift() // empty line

  const leftPathsMap: Map<string, string> = new Map()
  const rightPathsMap: Map<string, string> = new Map()
  const stringToIndexMap: Map<string, number> = new Map()

  const rightPathIndexes: number[] = []
  const leftPathIndexes: number[] = []

  const inputs: string[] = []
  const inputIndexes: number[] = []
  const targetIndexes: number[] = []

  stringArray.forEach((line, index) => {
    const parser = /^(?<input>[A-Z0-9]+) = \((?<left>[A-Z0-9]+), (?<right>[A-Z0-9]+)\)$/
    const parsed = line.match(parser)
    const inputString = parsed!.groups!.input!
    const left = parsed!.groups!.left!
    const right = parsed!.groups!.right!

    leftPathsMap.set(inputString, left)
    rightPathsMap.set(inputString, right)
    stringToIndexMap.set(inputString, index)

    if (inputString[inputString.length - 1] === 'A') {
      inputs.push(inputString)
      inputIndexes.push(index)
    }

    if (inputString[inputString.length - 1] === 'Z') {
      targetIndexes.push(index)
    }
  })

  rightPathsMap.forEach((item) => {
    rightPathIndexes.push(stringToIndexMap.get(item)!)
  })

  leftPathsMap.forEach((item) => {
    leftPathIndexes.push(stringToIndexMap.get(item)!)
  })

  const numberOfDirections = directions!.length
  const numberOfInputs = inputs.length

  let directionIndex = 0

  let stepsFromAAAtoZZZ = 0
  let currentLocationIndex = stringToIndexMap.get('AAA')!
  const ZZZIndex = stringToIndexMap.get('ZZZ')!

  while (currentLocationIndex !== ZZZIndex) {
    const currentDirection = directions[directionIndex]
    if (currentDirection === 'L') {
      currentLocationIndex = leftPathIndexes[currentLocationIndex]
    }
    if (currentDirection === 'R') {
      currentLocationIndex = rightPathIndexes[currentLocationIndex]
    }
    stepsFromAAAtoZZZ++

    directionIndex = (directionIndex + 1) % numberOfDirections
  }

  // PART 2
  let currentStepsCounter
  const simultaneousSteps = []

  for (let j = 0; j < numberOfInputs; j++) {
    currentStepsCounter = 0
    let atTarget = false
    currentLocationIndex = inputIndexes[j]
    directionIndex = 0
    while (!atTarget) {
      const currentDirection = directions[directionIndex]
      if (currentDirection === 'L') {
        currentLocationIndex = leftPathIndexes[currentLocationIndex]
      }
      if (currentDirection === 'R') {
        currentLocationIndex = rightPathIndexes[currentLocationIndex]
      }
      currentStepsCounter++
      if (targetIndexes.includes(currentLocationIndex)) {
        simultaneousSteps.push(currentStepsCounter)
        atTarget = true // added tracker, to only check includes once
        break
      }

      directionIndex = (directionIndex + 1) % numberOfDirections // ensure that we loop back to the start if we've gone through all directions
    }
  }

  return {
    answerQuestion1: stepsFromAAAtoZZZ,
    answerQuestion2: findLeastCommonMultiple(simultaneousSteps),
  }
}
