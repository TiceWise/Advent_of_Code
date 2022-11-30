import { AoC2022Day1 } from './index'

describe('AoC 2022 day 1', () => {
  const input = '1721\n' + '979\n' + '366\n' + '299\n' + '675\n' + '1456'
  it('should correctly answer question 1', () => {
    expect(AoC2022Day1(input).answerQuestion1).toBe(514579)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day1(input).answerQuestion2).toBe(241861950)
  })
})
