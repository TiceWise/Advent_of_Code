import { AoC2023Day2 } from './day2'
import path from 'path'
import fs from 'fs'

describe.only('AoC 2023 day 2', () => {
  let inputQ1: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      // Use promisify to convert the callback-based fs.readFile to a Promise-based function
      const readFileAsync = fs.promises.readFile

      const fileNameQ1: string = 'inputQ1.txt'
      const filePathQ1: string = path.join(__dirname, fileNameQ1)
      inputQ1 = await readFileAsync(filePathQ1, 'utf8')

      const fileNameQ2: string = 'inputQ2.txt'
      const filePathQ2: string = path.join(__dirname, fileNameQ2)
      inputQ2 = await readFileAsync(filePathQ2, 'utf8')
      // inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC2023Day2(inputQ1).answerQuestion1).toBe(10)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day2(inputQ2).answerQuestion2).toBe(20)
  })
})
