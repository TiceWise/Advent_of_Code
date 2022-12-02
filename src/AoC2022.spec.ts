import { AoC2022Day1, AoC2022Day2, AoC2022Day3 } from './index'
import * as fs from 'fs'

const input = fs.readFileSync('src/assets/day3.txt', 'utf8')

describe('AoC 2022', () => {
  it('should correctly day 3 answer question 1', () => {
    expect(AoC2022Day3(input).answerQuestion1).toBe(0)
  })

  it.skip('should correctly day 3 answer question 2', () => {
    expect(AoC2022Day3(input).answerQuestion2).toBe(0)
  })

  it.skip('should correctly day 2 answer question 1', () => {
    expect(AoC2022Day2(input).answerQuestion1).toBe(15)
  })

  it.skip('should correctly day 2 answer question 2', () => {
    expect(AoC2022Day2(input).answerQuestion2).toBe(12)
  })

  it.skip('should correctly day 1 answer question 1', () => {
    const input = fs.readFileSync('src/assets/day1.txt', 'utf8')
    expect(AoC2022Day1(input).answerQuestion1).toBe(24000)
  })

  it.skip('should correctly day 1 answer question 2', () => {
    const input = fs.readFileSync('src/assets/day1.txt', 'utf8')
    expect(AoC2022Day1(input).answerQuestion2).toBe(45000)
  })
})
