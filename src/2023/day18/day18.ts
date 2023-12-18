import { Answer } from '../../models/models'
import { abs } from 'mathjs'

function findArea2(stringArray: string[], colorSteps: boolean = true) {
  let row = 0
  let col = 0

  const points: { x: number; y: number }[] = []

  points.push({ x: col, y: row })

  stringArray.forEach((line) => {
    const parser = /^(?<direction>[UDLR]) (?<steps>\d+) \(#(?<color>[0-9a-f]+)\)$/
    const parsed = line.match(parser)
    let direction = parsed!.groups!.direction!
    let steps = parseInt(parsed!.groups!.steps!)
    const color = parsed!.groups!.color!

    if (colorSteps) {
      const dist = color.slice(0, 5)
      const dir = parseInt(color.slice(-1))
      steps = parseInt(dist, 16)
      if (dir === 0) {
        direction = 'R'
      } else if (dir === 1) {
        direction = 'D'
      } else if (dir === 2) {
        direction = 'L'
      } else if (dir === 3) {
        direction = 'U'
      }
    }

    if (direction === 'R') {
      col = col + steps
    }
    if (direction === 'L') {
      col = col - steps
    }
    if (direction === 'D') {
      row = row + steps
    }
    if (direction === 'U') {
      row = row - steps
    }

    points.push({ x: col, y: row })
  })

  points.push({ x: 0, y: 0 })

  let doubleArea = 0
  let perim = 0

  // shoelace for day is most part is most of the area
  // but we also need to add like half of the perimeter because we're tracking the outside points
  for (let i = 0; i < points.length - 1; i++) {
    const xi = points[i].x
    const xi1 = points[i + 1].x
    const yi = points[i].y
    const yi1 = points[i + 1].y

    doubleArea += xi * yi1 - yi * xi1
    // doubleArea += (yi + yi1) * (xi - xi1)
    perim += abs(yi1 - yi) + abs(xi1 - xi)
  }

  return doubleArea / 2 + perim / 2 + 1
}

export function AoC2023Day18(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')
  const answerQuestion1 = findArea2(stringArray, false)
  const answerQuestion2 = findArea2(stringArray, true)

  return { answerQuestion1, answerQuestion2 }
}

/* initial solution Question 1
function findArea1(stringArray: string[]) {
  let row = 0
  let col = 0

  let maxRow = row
  let minRow = row
  let maxCol = col
  let minCol = col

  const outline: Set<string> = new Set()

  stringArray.forEach((line) => {
    const parser = /^(?<direction>[UDLR]) (?<steps>\d+) \(#(?<color>[0-9a-f]+)\)$/
    const parsed = line.match(parser)
    const direction = parsed!.groups!.direction!
    const steps = parseInt(parsed!.groups!.steps!)

    if (direction === 'R') {
      for (let c = col; c <= col + steps; c++) {
        outline.add(`${c},${row}`)
      }

      col = col + steps
    }

    if (direction === 'L') {
      for (let c = col; c >= col - steps; c--) {
        outline.add(`${c},${row}`)
      }

      col = col - steps
    }

    if (direction === 'D') {
      for (let r = row; r <= row + steps; r++) {
        outline.add(`${col},${r}`)
      }

      row = row + steps
    }

    if (direction === 'U') {
      for (let r = row; r >= row - steps; r--) {
        outline.add(`${col},${r}`)
      }

      row = row - steps
    }

    if (row > maxRow) {
      maxRow = row
    }
    if (row < minRow) {
      minRow = row
    }
    if (col > maxCol) {
      maxCol = col
    }
    if (col < minCol) {
      minCol = col
    }
  })

  const lineSize = outline.size

  function floodSearch(startX: number, startY: number): Set<string> {
    const stack: Array<[number, number]> = [[startX, startY]]
    const visited: Set<string> = new Set()

    while (stack.length) {
      const [x, y] = stack.pop() as [number, number]
      const pos = `${x},${y}`

      if (
        x >= maxCol + 1 ||
        y >= maxRow + 1 ||
        x < minCol - 1 ||
        y < minRow - 1 ||
        visited.has(pos) ||
        outline.has(pos)
      ) {
        continue
      }

      visited.add(pos)
      stack.push([x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y])
    }

    return visited
  }

  const inside = floodSearch(1, 1) // gamble that 1, 1 is on the inside...

  const answerQuestion1 = inside.size + lineSize
  return answerQuestion1
}
*/
