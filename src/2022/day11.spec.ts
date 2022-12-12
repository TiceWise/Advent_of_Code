import { AoC2022Day11 } from './day11'

const input =
  'Monkey 0:\n' +
  '  Starting items: 79, 98\n' +
  '  Operation: new = old * 19\n' +
  '  Test: divisible by 23\n' +
  '    If true: throw to monkey 2\n' +
  '    If false: throw to monkey 3\n' +
  '\n' +
  'Monkey 1:\n' +
  '  Starting items: 54, 65, 75, 74\n' +
  '  Operation: new = old + 6\n' +
  '  Test: divisible by 19\n' +
  '    If true: throw to monkey 2\n' +
  '    If false: throw to monkey 0\n' +
  '\n' +
  'Monkey 2:\n' +
  '  Starting items: 79, 60, 97\n' +
  '  Operation: new = old * old\n' +
  '  Test: divisible by 13\n' +
  '    If true: throw to monkey 1\n' +
  '    If false: throw to monkey 3\n' +
  '\n' +
  'Monkey 3:\n' +
  '  Starting items: 74\n' +
  '  Operation: new = old + 3\n' +
  '  Test: divisible by 17\n' +
  '    If true: throw to monkey 0\n' +
  '    If false: throw to monkey 1\n'

describe('AoC 2022 day 11', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day11(input).answerQuestion1).toBe(10605)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day11(input).answerQuestion2).toBe(2713310158)
  })
})
