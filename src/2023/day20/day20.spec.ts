import { AoC2023Day20 } from './day20'
import path from 'path'
import fs from 'fs'

describe('AoC 2023 day 20', () => {
  let inputQ1: string
  let inputQ1b: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      inputQ1 = await readFileAsync(path.join(__dirname, 'inputQ1.txt'), 'utf8')
      inputQ1b = await readFileAsync(path.join(__dirname, 'inputQ1b.txt'), 'utf8')

      inputQ2 = await readFileAsync(path.join(__dirname, 'inputQ2.txt'), 'utf8')

      // inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day20(inputQ1).answerQuestion1).toBe(32000000)
  })

  it('should correctly answer question 1b', () => {
    expect(AoC2023Day20(inputQ1b).answerQuestion1).toBe(11687500)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day20(inputQ2).answerQuestion2).toBe(222718819437131)
  })
})
