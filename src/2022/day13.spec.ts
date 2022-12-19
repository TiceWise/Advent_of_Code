import { AoC2022Day13 } from './day13'

const input =
  '[1,1,3,1,1]\n' +
  '[1,1,5,1,1]\n' +
  '\n' +
  '[[1],[2,3,4]]\n' +
  '[[1],4]\n' +
  '\n' +
  '[9]\n' +
  '[[8,7,6]]\n' +
  '\n' +
  '[[4,4],4,4]\n' +
  '[[4,4],4,4,4]\n' +
  '\n' +
  '[7,7,7,7]\n' +
  '[7,7,7]\n' +
  '\n' +
  '[]\n' +
  '[3]\n' +
  '\n' +
  '[[[]]]\n' +
  '[[]]\n' +
  '\n' +
  '[1,[2,[3,[4,[5,6,7]]]],8,9]\n' +
  '[1,[2,[3,[4,[5,6,0]]]],8,9]\n'

describe('AoC 2022 day 13', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day13(input).answerQuestion1).toBe(13)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day13(input).answerQuestion2).toBe(140)
  })
})
