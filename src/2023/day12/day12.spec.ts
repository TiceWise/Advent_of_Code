import { AoC2023Day12 } from './day12'
import path from 'path'
import fs from 'fs'

describe('AoC 2023 day 12', () => {
  let inputQ1: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      inputQ1 = await readFileAsync(path.join(__dirname, 'inputQ1.txt'), 'utf8')

      inputQ2 = await readFileAsync(path.join(__dirname, 'inputQ2.txt'), 'utf8')

      // inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12('???.### 1,1,3').answerQuestion1).toBe(1)
  })

  it('more bins than input doesnt seem to appear in real set', () => {
    expect(AoC2023Day12('.??..??...?##. 1,1,3').answerQuestion1).toBe(4)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12('?#?#?#?#?#?#?#? 1,3,1,6').answerQuestion1).toBe(1)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12('????.#...#... 4,1,1').answerQuestion1).toBe(1)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12('????.######..#####. 1,6,5').answerQuestion1).toBe(4)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12('?###???????? 3,2,1').answerQuestion1).toBe(10)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day12(inputQ1).answerQuestion1).toBe(21)
  })

  it.skip('should correctly answer question 2', () => {
    expect(AoC2023Day12(inputQ2).answerQuestion1).toBe(20)
  })
})
