import { AoC2022Day1 } from './day1'

const input =
  '1000\n' +
  '2000\n' +
  '3000\n' +
  '\n' +
  '4000\n' +
  '\n' +
  '5000\n' +
  '6000\n' +
  '\n' +
  '7000\n' +
  '8000\n' +
  '9000\n' +
  '\n' +
  '10000\n'

describe('AoC 2022 day 1', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day1(input).answerQuestion1).toBe(24000)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day1(input).answerQuestion2).toBe(45000)
  })
})
