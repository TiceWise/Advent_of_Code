import { Answer } from '../models/models'

interface Location {
  x: number
  y: number
}

function moveTtoH(T: Location, H: Location) {
  if (H.y - T.y === 2 && H.x === T.x) {
    T.y++
  }
  // down
  if (T.y - H.y === 2 && H.x === T.x) {
    T.y--
  }
  // right
  if (H.y === T.y && H.x - T.x === 2) {
    T.x++
  }
  // left
  if (H.y === T.y && T.x - H.x === 2) {
    T.x--
  }
  // up right
  if ((H.y - T.y >= 2 && H.x - T.x >= 1) || (H.y - T.y >= 1 && H.x - T.x >= 2)) {
    T.y++
    T.x++
  }
  // down right
  if ((T.y - H.y >= 2 && H.x - T.x >= 1) || (T.y - H.y >= 1 && H.x - T.x >= 2)) {
    T.y--
    T.x++
  }
  // down left
  if ((T.y - H.y >= 2 && T.x - H.x >= 1) || (T.y - H.y >= 1 && T.x - H.x >= 2)) {
    T.y--
    T.x--
  }
  // up left
  if ((H.y - T.y === 2 && T.x - H.x >= 1) || (H.y - T.y >= 1 && T.x - H.x === 2)) {
    T.y++
    T.x--
  }
}

function getUniqueVisited(visited: Location[]) {
  return visited.filter((value, index, self) => index === self.findIndex((t) => t.x === value.x && t.y === value.y))
}

const width = 800
const height = 800

function visualize(T: Location[]) {
  const locArray = [...Array(height)].map(() => Array(width).fill('.'))

  locArray[height / 2][width / 2] = 's'
  for (let k = T.length - 1; k >= 1; k--) {
    locArray[T[k].y + height / 2][T[k].x + width / 2] = k.toString()
  }
  locArray[T[0].y + height / 2][T[0].x + width / 2] = 'H'
  for (let i = locArray.length - 1; i >= 0; i--) {
    console.log(locArray[i].join(''))
  }
}

function visualizeVisited(visitedUnique: Location[]) {
  const visitedArray = [...Array(height)].map(() => Array(width).fill('.'))
  visitedUnique.forEach((visitedLoc) => {
    visitedArray[visitedLoc.y + height / 2][visitedLoc.x + width / 2] = '#'
  })
  for (let i = visitedArray.length - 1; i >= 0; i--) {
    console.log(visitedArray[i].join(''))
  }
}

export function AoC2022Day9(input: string): Answer {
  const dataIn = input.split('\n')

  dataIn.pop()

  const s: Location = { x: 0, y: 0 }
  const T: Location[] = []
  const numberOfKnots = 10
  for (let j = 0; j < numberOfKnots; j++) {
    T.push({ ...s })
  }

  // H = T0!

  const visitedT1: Location[] = []
  const visitedT9: Location[] = []

  dataIn.forEach((instruction) => {
    const [dir, count] = instruction.split(' ')

    for (let i = 0; i < parseInt(count); i++) {
      // move H
      if (dir === 'U') {
        T[0].y++
      }
      if (dir === 'D') {
        T[0].y--
      }
      if (dir === 'R') {
        T[0].x++
      }
      if (dir === 'L') {
        T[0].x--
      }

      for (let k = 0; k < numberOfKnots - 1; k++) {
        moveTtoH(T[k + 1], T[k])
      }

      // visualize(T)

      visitedT1.push({ ...T[1] })
      visitedT9.push({ ...T[9] })
    }
  })

  // console.log(visitedUnique)

  // PART 2; functie maken van Move T (tov H), en dan 10 T's aanmaken, en T2 laten moven tov. T1
  // Track tail 9 (all tales start in the same place, like H and T
  const visitedUniqueT1 = getUniqueVisited(visitedT1)
  const visitedUniqueT9 = getUniqueVisited(visitedT9)

  // visualizeVisited(visitedUniqueT1)
  // visualizeVisited(visitedUniqueT9)
  // const visitedUnique = new Set(visitedT1)
  return { answerQuestion1: visitedUniqueT1.length, answerQuestion2: visitedUniqueT9.length }
}
