import { AoC2022Day9 } from './day9'

describe('AoC 2022 day 9', () => {
  it('should correctly answer question 1', () => {
    const input = 'R 4\n' + 'U 4\n' + 'L 3\n' + 'D 1\n' + 'R 4\n' + 'D 1\n' + 'L 5\n' + 'R 2\n'
    expect(AoC2022Day9(input).answerQuestion1).toBe(13)
  })

  it('should correctly answer question 2', () => {
    const input = 'R 5\n' + 'U 8\n' + 'L 8\n' + 'D 3\n' + 'R 17\n' + 'D 10\n' + 'L 25\n' + 'U 20\n'
    expect(AoC2022Day9(input).answerQuestion2).toBe(36)
  })
})
