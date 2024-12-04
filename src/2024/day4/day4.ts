import { Answer } from '../../models/models'

export function AoC2024Day4(input: string): Answer {
  const stringArray = input.split('\n')

  let XMAScount = 0
  let MAScount = 0

  const rows = stringArray.length

  // search for X
  for (let i = 0; i < rows; i++) {
    const cols = stringArray[i].length
    for (let j = 0; j < cols; j++) {
      // ============= Q1 ===============
      if (stringArray[i][j] === 'X') {
        // look in all directions for M,

        // U
        if (
          i - 3 >= 0 &&
          stringArray[i - 1][j] === 'M' &&
          stringArray[i - 2][j] === 'A' &&
          stringArray[i - 3][j] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // UR
        if (
          i - 3 >= 0 &&
          j + 3 < cols &&
          stringArray[i - 1][j + 1] === 'M' &&
          stringArray[i - 2][j + 2] === 'A' &&
          stringArray[i - 3][j + 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // R
        if (
          j + 3 < cols &&
          stringArray[i][j + 1] === 'M' &&
          stringArray[i][j + 2] === 'A' &&
          stringArray[i][j + 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // DR
        if (
          i + 3 < rows &&
          j + 3 < cols &&
          stringArray[i + 1][j + 1] === 'M' &&
          stringArray[i + 2][j + 2] === 'A' &&
          stringArray[i + 3][j + 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // D
        if (
          i + 3 < rows &&
          stringArray[i + 1][j] === 'M' &&
          stringArray[i + 2][j] === 'A' &&
          stringArray[i + 3][j] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // DL
        if (
          i + 3 < rows &&
          j - 3 >= 0 &&
          stringArray[i + 1][j - 1] === 'M' &&
          stringArray[i + 2][j - 2] === 'A' &&
          stringArray[i + 3][j - 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // L
        if (
          j - 3 >= 0 &&
          stringArray[i][j - 1] === 'M' &&
          stringArray[i][j - 2] === 'A' &&
          stringArray[i][j - 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }

        // UL
        if (
          i - 3 >= 0 &&
          j - 3 >= 0 &&
          stringArray[i - 1][j - 1] === 'M' &&
          stringArray[i - 2][j - 2] === 'A' &&
          stringArray[i - 3][j - 3] === 'S'
        ) {
          // console.log(i, j)
          XMAScount += 1
        }
      }
    }
  }

  // ============= Q2 ===============
  // search for A
  for (let i = 1; i < rows - 1; i++) {
    const cols = stringArray[i].length
    for (let j = 1; j < cols - 1; j++) {
      if (stringArray[i][j] === 'A') {
        // U
        if (
          stringArray[i - 1][j - 1] === 'M' &&
          stringArray[i - 1][j + 1] === 'M' &&
          stringArray[i + 1][j - 1] === 'S' &&
          stringArray[i + 1][j + 1] === 'S'
        ) {
          MAScount += 1
        }

        // D
        if (
          stringArray[i - 1][j - 1] === 'S' &&
          stringArray[i - 1][j + 1] === 'S' &&
          stringArray[i + 1][j - 1] === 'M' &&
          stringArray[i + 1][j + 1] === 'M'
        ) {
          MAScount += 1
        }

        // L
        if (
          stringArray[i - 1][j - 1] === 'M' &&
          stringArray[i - 1][j + 1] === 'S' &&
          stringArray[i + 1][j - 1] === 'M' &&
          stringArray[i + 1][j + 1] === 'S'
        ) {
          MAScount += 1
        }

        // R
        if (
          stringArray[i - 1][j - 1] === 'S' &&
          stringArray[i - 1][j + 1] === 'M' &&
          stringArray[i + 1][j - 1] === 'S' &&
          stringArray[i + 1][j + 1] === 'M'
        ) {
          MAScount += 1
        }
      }
    }
  }

  return { answerQuestion1: XMAScount, answerQuestion2: MAScount }
}
