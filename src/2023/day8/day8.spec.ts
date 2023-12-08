import { AoC2023Day8 } from './day8'
import path from 'path'
import fs from 'fs'

describe('AoC 2023 day 8', () => {
  let inputQ1: string
  let inputQ1b: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      const fileNameQ1: string = 'inputQ1.txt'
      const filePathQ1: string = path.join(__dirname, fileNameQ1)
      inputQ1 = await readFileAsync(filePathQ1, 'utf8')

      const fileNameQ1b: string = 'inputQ1b.txt'
      const filePathQ1b: string = path.join(__dirname, fileNameQ1b)
      inputQ1b = await readFileAsync(filePathQ1b, 'utf8')

      const fileNameQ2: string = 'inputQ2.txt'
      const filePathQ2: string = path.join(__dirname, fileNameQ2)
      inputQ2 = await readFileAsync(filePathQ2, 'utf8')
      // inputQ1b = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day8(inputQ1).answerQuestion1).toBe(2)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day8(inputQ1b).answerQuestion1).toBe(6)
  })

  it('should correctly answer question Real', () => {
    expect(AoC2023Day8(inputQ2).answerQuestion2).toBe(6)
  })
})
