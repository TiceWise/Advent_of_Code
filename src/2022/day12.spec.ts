import { AoC2022Day12 } from './day12'

const input = 'Sabqponm\n' + 'abcryxxl\n' + 'accszExk\n' + 'acctuvwj\n' + 'abdefghi\n' + '\n'

describe('AoC 2022 day 12', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day12(input).answerQuestion1).toBe(31)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day12(input).answerQuestion2).toBe(29)
  })
})
