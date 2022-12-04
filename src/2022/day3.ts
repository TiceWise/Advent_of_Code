import { Answer } from '../models/models'

export function AoC2022Day3(input: string): Answer {
  const rucksacks = input.split('\n')

  let prioritySum = 0

  rucksacks.forEach((rucksack) => {
    const compOne = rucksack.slice(0, rucksack.length / 2)
    const compTwo = rucksack.slice(rucksack.length / 2, rucksack.length)
    const priorityChar = findPriority(compOne, compTwo)

    if (priorityChar) {
      prioritySum += getPriorityFromChar(priorityChar)
    }
  })

  // Part 2
  const ruckSacksPerGroup = 3
  let commonSum = 0

  for (let i = 0; i < rucksacks.length / ruckSacksPerGroup; i++) {
    const rucksack1 = rucksacks[i * ruckSacksPerGroup]
    const rucksack2 = rucksacks[i * ruckSacksPerGroup + 1]
    const rucksack3 = rucksacks[i * ruckSacksPerGroup + 2]

    const commonChar = findCommon(rucksack1, rucksack2, rucksack3)
    if (commonChar) {
      commonSum += getPriorityFromChar(commonChar)
    }
  }
  return { answerQuestion1: prioritySum, answerQuestion2: commonSum }
}

function findPriority(compOne: string, compTwo: string) {
  for (let i = 0; i < compOne.length; i++) {
    for (let j = 0; j < compTwo.length; j++) {
      if (compOne[i] === compTwo[j]) {
        return compOne[i]
      }
    }
  }
}

function getPriorityFromChar(priorityChar: string) {
  if (priorityChar === priorityChar?.toUpperCase()) {
    return priorityChar.charCodeAt(0) - 38
  }
  if (priorityChar === priorityChar?.toLowerCase()) {
    return priorityChar.charCodeAt(0) - 96
  }
  return 0
}

function findCommon(rucksack1: string, rucksack2: string, rucksack3: string) {
  for (let i = 0; i < rucksack1.length; i++) {
    for (let j = 0; j < rucksack2.length; j++) {
      for (let k = 0; k < rucksack3.length; k++) {
        if (rucksack1[i] === rucksack2[j] && rucksack1[i] === rucksack3[k]) {
          return rucksack1[i]
        }
      }
    }
  }
}
