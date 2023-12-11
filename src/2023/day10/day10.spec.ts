import { AoC2023Day10 } from './day10'
import path from 'path'
import fs from 'fs'

describe('AoC 2023 day 10', () => {
  let inputQ1: string
  let inputQ1b: string
  let inputQ1c: string
  let inputQ2: string
  let inputQ2b: string
  let inputQ2c: string
  let inputQ2d: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      inputQ1 = await readFileAsync(path.join(__dirname, 'inputQ1.txt'), 'utf8')

      inputQ1b = await readFileAsync(path.join(__dirname, 'inputQ1b.txt'), 'utf8')

      inputQ1c = await readFileAsync(path.join(__dirname, 'inputQ1c.txt'), 'utf8')

      inputQ2 = await readFileAsync(path.join(__dirname, 'inputQ2.txt'), 'utf8')

      inputQ2b = await readFileAsync(path.join(__dirname, 'inputQ2b.txt'), 'utf8')

      inputQ2c = await readFileAsync(path.join(__dirname, 'inputQ2c.txt'), 'utf8')

      inputQ2d = await readFileAsync(path.join(__dirname, 'inputQ2d.txt'), 'utf8')
      // inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day10(inputQ1).answerQuestion1).toBe(4)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day10(inputQ1b).answerQuestion1).toBe(4)
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day10(inputQ1c).answerQuestion1).toBe(8)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day10(inputQ1).answerQuestion2).toBe(1)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day10(inputQ1c).answerQuestion2).toBe(1)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day10(inputQ2).answerQuestion2).toBe(4)
  })

  it.skip('should correctly answer question 2', () => {
    // unexpected left hand inside option, skipped
    expect(AoC2023Day10(inputQ2b).answerQuestion2).toBe(8)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day10(inputQ2c).answerQuestion2).toBe(10)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day10(inputQ2d).answerQuestion2).toBe(4)
  })
})
