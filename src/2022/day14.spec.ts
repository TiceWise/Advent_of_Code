import { AoC2022Day14 } from './day14'

const input = '498,4 -> 498,6 -> 496,6\n' + '503,4 -> 502,4 -> 502,9 -> 494,9\n'

describe('AoC 2022 day 14', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day14(input).answerQuestion1).toBe(24)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day14(input).answerQuestion2).toBe(93)
  })
})
