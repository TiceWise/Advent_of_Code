import { AoC2022Day5 } from './day5'

const input =
  '    [D]    \n' +
  '[N] [C]    \n' +
  '[Z] [M] [P]\n' +
  ' 1   2   3 \n' +
  '\n' +
  'move 1 from 2 to 1\n' +
  'move 3 from 1 to 3\n' +
  'move 2 from 2 to 1\n' +
  'move 1 from 1 to 2\n'

describe.only('AoC 2022 day 5', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day5(input).answerQuestion1).toBe('CMZ')
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day5(input).answerQuestion2).toBe('MCD')
  })
})
