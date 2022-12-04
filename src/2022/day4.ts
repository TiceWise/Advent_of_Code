import { Answer } from '../models/models'

export function AoC2022Day4(input: string): Answer {
  const pairs = input.split('\n')

  let fullyOverlapCount = 0
  let overlapAtAllCount = 0

  pairs.forEach((pair) => {
    if (pair) {
      const [firstElf, secondElf] = pair.split(',')

      if (sectionsFullyOverlap(firstElf, secondElf) || sectionsFullyOverlap(secondElf, firstElf)) {
        fullyOverlapCount++
      }

      if (sectionsPartlyOverlap(firstElf, secondElf)) {
        overlapAtAllCount++
      }
    }
  })

  return { answerQuestion1: fullyOverlapCount, answerQuestion2: overlapAtAllCount }
}

function sectionsFullyOverlap(firstElf: string, secondElf: string): boolean {
  const { start: startFirst, end: endFirst } = splitElf(firstElf)
  const { start: startSecond, end: endSecond } = splitElf(secondElf)

  return startFirst <= startSecond && endFirst >= endSecond
}

function sectionsPartlyOverlap(firstElf: string, secondElf: string): boolean {
  const { start: startFirst, end: endFirst } = splitElf(firstElf)
  const { start: startSecond, end: endSecond } = splitElf(secondElf)

  return (endFirst >= startSecond && endFirst <= endSecond) || (endSecond >= startFirst && endSecond <= endFirst)
}

function splitElf(firstElf: string) {
  const [startStr, endStr] = firstElf.split('-')
  return { start: parseInt(startStr), end: parseInt(endStr) }
}
