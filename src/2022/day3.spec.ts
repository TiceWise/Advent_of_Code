import { AoC2022Day3 } from './day3'

const input =
  'vJrwpWtwJgWrhcsFMMfFFhFp\n' +
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\n' +
  'PmmdzqPrVvPwwTWBwg\n' +
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\n' +
  'ttgJtRGJQctTZtZT\n' +
  'CrZsJsPPZsGzwwsLwLmpwMDw'

describe('AoC 2022 day 3', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day3(input).answerQuestion1).toBe(157)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day3(input).answerQuestion2).toBe(70)
  })
})
