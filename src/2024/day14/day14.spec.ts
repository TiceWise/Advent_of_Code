import { AoC2024Day14 } from './day14'
import path from 'path'
import fs from 'fs'

describe('AoC 2024 day 14', () => {
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

  it.skip('should correctly answer question 1', async () => {
    expect((await AoC2024Day14(inputQ1, true)).answerQuestion1).toBe(12)
  })

  it.skip('should correctly answer question 2', async () => {
    expect((await AoC2024Day14(inputQ2, true)).answerQuestion2).toBe(20)
  })
})
