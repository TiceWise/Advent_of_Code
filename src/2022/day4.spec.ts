import { AoC2022Day4 } from './day4'

const input = '2-4,6-8\n' + '2-3,4-5\n' + '5-7,7-9\n' + '2-8,3-7\n' + '6-6,4-6\n' + '2-6,4-8'

describe('AoC 2022 day 4', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day4(input).answerQuestion1).toBe(2)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day4(input).answerQuestion2).toBe(4)
  })
})
