import { AoC2022Day2 } from './day2'

const input = 'A Y\n' + 'B X\n' + 'C Z\n'

describe('AoC 2022 day 2', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day2(input).answerQuestion1).toBe(15)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day2(input).answerQuestion2).toBe(12)
  })
})
