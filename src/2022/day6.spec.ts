import { AoC2022Day6 } from './day6'

describe('AoC 2022 day 6', () => {
  it('should correctly answer question 1.1', () => {
    const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
    expect(AoC2022Day6(input).answerQuestion1).toBe(7)
  })

  it('should correctly answer question 1.2', () => {
    const input = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
    expect(AoC2022Day6(input).answerQuestion1).toBe(5)
  })

  it('should correctly answer question 1.3', () => {
    const input = 'nppdvjthqldpwncqszvftbrmjlhg'
    expect(AoC2022Day6(input).answerQuestion1).toBe(6)
  })

  it('should correctly answer question 1.4', () => {
    const input = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
    expect(AoC2022Day6(input).answerQuestion1).toBe(10)
  })

  it('should correctly answer question 1.5', () => {
    const input = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
    expect(AoC2022Day6(input).answerQuestion1).toBe(11)
  })

  it('should correctly answer question 2.1', () => {
    const input = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
    expect(AoC2022Day6(input).answerQuestion2).toBe(19)
  })

  it('should correctly answer question 2.2', () => {
    const input = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
    expect(AoC2022Day6(input).answerQuestion2).toBe(23)
  })

  it('should correctly answer question 2.3', () => {
    const input = 'nppdvjthqldpwncqszvftbrmjlhg'
    expect(AoC2022Day6(input).answerQuestion2).toBe(23)
  })

  it('should correctly answer question 2.4', () => {
    const input = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
    expect(AoC2022Day6(input).answerQuestion2).toBe(29)
  })

  it('should correctly answer question 2.5', () => {
    const input = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'
    expect(AoC2022Day6(input).answerQuestion2).toBe(26)
  })
})
