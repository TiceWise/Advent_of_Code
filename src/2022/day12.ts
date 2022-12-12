import { Answer } from '../models/models'

function updateDistanceArray(
  row: number,
  col: number,
  currentNode: string,
  currentDist: number,
  dataIn: string[],
  visitedArray: boolean[][],
  tentativeDistanceArray: number[][]
) {
  if (
    // check bounds
    row >= 0 &&
    row < dataIn.length - 2 &&
    col >= 0 &&
    col < dataIn[0].length &&
    // check if we've not visited this node before (probably double in my algorithm)
    !visitedArray[row][col] &&
    // if the distance is smaller than or equal to 1 step up
    dataIn[row][col].charCodeAt(0) - currentNode.charCodeAt(0) <= 1 &&
    // and if the new distance to this point is actually smaller
    currentDist + 1 < tentativeDistanceArray[row][col]
  ) {
    // then set the new distance (adds one to current distance as all steps are distance 1)
    tentativeDistanceArray[row][col] = currentDist + 1
  }
}

function findShortestPath(dataIn: string[], startRow: number, startCol: number, destRow: number, destCol: number) {
  const numberOfRows = dataIn.length - 2
  const numberOfCols = dataIn[0].length

  const visitedArray: boolean[][] = [...Array(numberOfRows)].map(() => Array(numberOfCols).fill(false))
  const tentativeDistanceArray: number[][] = [...Array(numberOfRows)].map(() => Array(numberOfCols).fill(Infinity))

  tentativeDistanceArray[startRow][startCol] = 0

  let row = startRow
  let col = startCol
  let doContinue = true

  while (doContinue) {
    // check up down left right
    const currentNode = dataIn[row][col]
    const currentDist = tentativeDistanceArray[row][col]

    // update distance array of neighbours
    // up
    updateDistanceArray(row - 1, col, currentNode, currentDist, dataIn, visitedArray, tentativeDistanceArray)

    // down
    updateDistanceArray(row + 1, col, currentNode, currentDist, dataIn, visitedArray, tentativeDistanceArray)

    // left
    updateDistanceArray(row, col - 1, currentNode, currentDist, dataIn, visitedArray, tentativeDistanceArray)

    // right
    updateDistanceArray(row, col + 1, currentNode, currentDist, dataIn, visitedArray, tentativeDistanceArray)

    let minDist = Infinity

    // find next node to check
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfCols; j++) {
        if (!visitedArray[i][j] && tentativeDistanceArray[i][j] < minDist) {
          minDist = tentativeDistanceArray[i][j]
          row = i
          col = j
        }
      }
    }

    // set current to visited
    visitedArray[row][col] = true

    // if we visited our destination or the best step we can do is infinity, we're done
    if (visitedArray[destRow][destCol] || minDist === Infinity) {
      doContinue = false
    }
  }

  // the number of steps is the distance in the
  return tentativeDistanceArray[destRow][destCol]
}

export function AoC2022Day12(input: string): Answer {
  const dataIn = input.split('\n')

  const numberOfRows = dataIn.length - 2
  const numberOfCols = dataIn[0].length

  const possibleStarts = []

  let destRow = 0
  let destCol = 0

  for (let i = 0; i < numberOfRows; i++) {
    for (let j = 0; j < numberOfCols; j++) {
      if (dataIn[i][j] === 'S') {
        possibleStarts.push({ startRow: i, startCol: j })
        dataIn[i] = dataIn[i].replace('S', 'a')
      }
      if (dataIn[i][j] === 'a') {
        possibleStarts.push({ startRow: i, startCol: j })
      }
      if (dataIn[i][j] === 'E') {
        destRow = i
        destCol = j
        dataIn[i] = dataIn[i].replace('E', 'z')
      }
    }
  }

  const answerQ1 = findShortestPath(dataIn, 0, 0, destRow, destCol)

  // Question 2
  let shortestPath = Infinity

  possibleStarts.forEach((possibleStart) => {
    const optionalShortestPath = findShortestPath(
      dataIn,
      possibleStart.startRow,
      possibleStart.startCol,
      destRow,
      destCol
    )

    if (optionalShortestPath < shortestPath) {
      shortestPath = optionalShortestPath
    }
  })

  return {
    answerQuestion1: answerQ1,
    answerQuestion2: shortestPath,
  }
}
