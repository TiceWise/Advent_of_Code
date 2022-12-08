import { Answer } from '../models/models'

export function AoC2022Day8(input: string): Answer {
  const dataIn = input.split('\n')

  // remove last '\n' line
  dataIn.pop()

  const visibilityArray = [...Array(dataIn[0].length)].map(() => Array(dataIn.length - 1))
  // after a nine, nothing is visible
  // all outlines are visible

  // top to bottom, left to right
  let max = -1
  for (let i = 0; i < dataIn.length; i++) {
    max = -1
    for (let j = 0; j < dataIn[i].length; j++) {
      if (parseInt(dataIn[i][j]) > max) {
        visibilityArray[i][j] = 1
        max = parseInt(dataIn[i][j])
      }
    }
  }

  // top to bottom, right to left
  for (let i = 0; i < dataIn.length; i++) {
    max = -1
    for (let j = dataIn[i].length - 1; j >= 0; j--) {
      if (parseInt(dataIn[i][j]) > max) {
        visibilityArray[i][j] = 1
        max = parseInt(dataIn[i][j])
      }
    }
  }

  // left to right, top to bottom
  for (let j = 0; j < dataIn[0].length; j++) {
    max = -1
    for (let i = 0; i < dataIn.length - 1; i++) {
      if (parseInt(dataIn[i][j]) > max) {
        visibilityArray[i][j] = 1
        max = parseInt(dataIn[i][j])
      }
    }
  }

  // left to right, bottom to top
  for (let j = 0; j < dataIn[0].length; j++) {
    max = -1
    for (let i = dataIn.length - 1; i >= 0; i--) {
      if (parseInt(dataIn[i][j]) > max) {
        visibilityArray[i][j] = 1
        max = parseInt(dataIn[i][j])
      }
    }
  }

  let sum = 0
  for (let i = 0; i < dataIn.length; i++) {
    max = -1
    for (let j = 0; j < dataIn[i].length; j++) {
      if (visibilityArray[i][j]) {
        sum++
      }
    }
  }

  // Part 2

  let highestViewScore = 0

  // top to bottom, left to right
  for (let i = 1; i < dataIn.length - 1; i++) {
    for (let j = 1; j < dataIn[i].length - 2; j++) {
      let upScore = 1
      let k = i - 1
      while (k > 0 && parseInt(dataIn[k][j]) < parseInt(dataIn[i][j])) {
        upScore++
        k--
      }

      let downScore = 1
      let l = i + 1
      while (l < dataIn.length - 1 && parseInt(dataIn[l][j]) < parseInt(dataIn[i][j])) {
        downScore++
        l++
      }

      let rightScore = 1
      let m = j + 1
      while (m < dataIn[i].length - 1 && parseInt(dataIn[i][m]) < parseInt(dataIn[i][j])) {
        rightScore++
        m++
      }

      let leftScore = 1
      let n = j - 1
      while (n > 0 && parseInt(dataIn[i][n]) < parseInt(dataIn[i][j])) {
        leftScore++
        n--
      }

      const viewScore = upScore * downScore * rightScore * leftScore

      if (viewScore > highestViewScore) {
        highestViewScore = viewScore
      }
    }
  }

  return { answerQuestion1: sum, answerQuestion2: highestViewScore }
}
