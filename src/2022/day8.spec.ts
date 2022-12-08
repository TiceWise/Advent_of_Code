import { AoC2022Day8 } from './day8'

const input = '30373\n' + '25512\n' + '65332\n' + '33549\n' + '35390\n'

describe.only('AoC 2022 day 8', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day8(input).answerQuestion1).toBe(21)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day8(input).answerQuestion2).toBe(8)
  })
})
