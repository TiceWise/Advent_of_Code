import { AoC2024Day10 } from './day10'
import path from 'path'
import fs from 'fs'

describe('AoC 2024 day 10', () => {
  let inputQ1: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      inputQ1 = await readFileAsync(path.join(__dirname, 'inputQ1.txt'), 'utf8')

      // inputQ2 = await readFileAsync(path.join(__dirname, 'inputQ2.txt'), 'utf8')

      inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2024Day10(inputQ1).answerQuestion1).toBe(36)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2024Day10(inputQ2).answerQuestion2).toBe(81)
  })
})
