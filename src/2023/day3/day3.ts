import { Answer } from '../../models/models'

interface MyMatch {
  row: number
  match: RegExpMatchArray
}

function getEdges(row: number, stringArray: string[], column: number, searchLength: number) {
  const top = row - 1 >= 0 ? row - 1 : 0
  const bottom = row + 1 >= stringArray.length ? stringArray.length - 1 : row + 1
  const left = column - 1 >= 0 ? column - 1 : 0
  const right =
    column + searchLength + 1 >= stringArray[row].length
      ? stringArray[row].length - 1
      : column + searchLength + 1
  return { top, bottom, left, right }
}

function isBetween(left: number, right: number) {
  return (partNumberMatch: MyMatch) => {
    const length = partNumberMatch.match[0].length
    const index = partNumberMatch.match.index
    return (
      (index! + length - 1 >= left && index! + length - 1 <= right) ||
      (index! >= left && index! <= right)
    )
  }
}

export function AoC2023Day3(input: string): Answer {
  const stringArray = input.split('\n')

  stringArray.pop()

  let allPartNumberMatches: MyMatch[] = []
  let allGearMatches: MyMatch[] = []

  const numberRegEx = /\d{1,3}/g
  const symbolRegEx = /[-=/*+%@#&$]/

  let partNumberTotal = 0
  let gearTotal = 0

  for (let i = 0; i < stringArray.length; i++) {
    const line = stringArray[i]

    // part 1
    const partNumberMatches = [...line.matchAll(numberRegEx)]

    allPartNumberMatches = [
      ...allPartNumberMatches,
      ...partNumberMatches.map((partNumberMatch) => ({ row: i, match: partNumberMatch })),
    ]

    // for each number check above, below, left, right for symbols
    partNumberMatches.forEach((partNumber) => {
      const partNumberLength = partNumber[0].length
      const partNumberIndex = partNumber.index

      // set top, bottom, left, right indexes
      const { top, bottom, left, right } = getEdges(
        i,
        stringArray,
        partNumberIndex!,
        partNumberLength
      )

      // check top, bottom, left, right
      const topMatch = stringArray[top].slice(left, right).match(symbolRegEx) !== null
      const bottomMatch = stringArray[bottom].slice(left, right).match(symbolRegEx) !== null
      const leftMatch = stringArray[i].slice(left, partNumberIndex).match(symbolRegEx) !== null
      const rightMatch =
        stringArray[i].slice(partNumberIndex! + partNumberLength, right).match(symbolRegEx) !== null

      if (topMatch || bottomMatch || leftMatch || rightMatch) {
        partNumberTotal = partNumberTotal + parseInt(partNumber[0])
      }
    })

    // part 2
    const gearMatches = [...line.matchAll(/[*]/g)]
    allGearMatches = [
      ...allGearMatches,
      ...gearMatches.map((gearMatch) => ({ match: gearMatch, row: i })),
    ]
  }

  allGearMatches.forEach((gearMatch) => {
    const { top, bottom, left, right } = getEdges(
      gearMatch.row,
      stringArray,
      gearMatch.match.index!,
      0
    )

    // match if end_partNum >= left_gear && end_partNum <= right_gear || start_partNum >= left_gear && start_partNum <= right_gear
    const topMatches = allPartNumberMatches
      .filter((partNumberMatch) => partNumberMatch.row === top)
      .filter(isBetween(left, right))
    const bottomMatches = allPartNumberMatches
      .filter((partNumberMatch) => partNumberMatch.row === bottom)
      .filter(isBetween(left, right))
    const leftMatches = allPartNumberMatches
      .filter((partNumberMatch) => partNumberMatch.row === gearMatch.row)
      .filter((partNumberMatch) => {
        const length = partNumberMatch.match[0].length
        const index = partNumberMatch.match.index
        return index! + length - 1 === left
      })
    const rightMatches = allPartNumberMatches
      .filter((partNumberMatch) => partNumberMatch.row === gearMatch.row)
      .filter((partNumberMatch) => {
        const index = partNumberMatch.match.index
        return index === right
      })

    const matches = [...rightMatches, ...leftMatches, ...topMatches, ...bottomMatches]

    if (matches.length === 2) {
      gearTotal += parseInt(matches[0].match[0]) * parseInt(matches[1].match[0])
    }
  })

  const answerQuestion1 = partNumberTotal
  const answerQuestion2 = gearTotal

  return { answerQuestion1, answerQuestion2 }
}
