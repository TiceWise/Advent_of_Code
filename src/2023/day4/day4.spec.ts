import { AoC2023Day4 } from './day4'
import path from 'path'
import fs from 'fs'

describe.only('AoC 2023 day 4', () => {
  let inputQ1: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      const fileNameQ1: string = 'inputQ1.txt'
      const filePathQ1: string = path.join(__dirname, fileNameQ1)
      inputQ1 = await readFileAsync(filePathQ1, 'utf8')

      // const fileNameQ2: string = 'inputQ2.txt'
      // const filePathQ2: string = path.join(__dirname, fileNameQ2)
      // inputQ2 = await readFileAsync(filePathQ2, 'utf8')
      inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it.only('should correctly answer question 1', () => {
    expect(AoC2023Day4(inputQ1).answerQuestion1).toBe(10)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2023Day4(inputQ2).answerQuestion2).toBe(20)
  })
})
