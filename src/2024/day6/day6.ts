import { Answer } from '../../models/models'

const setObstacleDone: Set<string> = new Set<string>()
const setPointOfInterest: Set<string> = new Set<string>()
const hits: Set<string> = new Set<string>()
let numberOfObjectOptions: number

function doWalk(stringArray: string[], rowStart: number, colStart: number, count: boolean = false) {
  let direction: '^' | 'v' | '<' | '>'

  direction = '^'

  let positionCount = 0

  let y = rowStart
  let x = colStart

  let i = 0
  let loop = false

  while (true) {
    if (i > numberOfObjectOptions) {
      loop = true
      break
    }

    if (count) {
      const currentTile = stringArray[y][x]

      if (
        currentTile !== '^' &&
        currentTile !== '>' &&
        currentTile !== 'v' &&
        currentTile !== '<'
      ) {
        // if not, turn into X and count result + 1
        const rowArr = [...stringArray[y]]
        rowArr[x] = direction
        stringArray[y] = rowArr.join('')
        positionCount++
      }
    }

    if (!setPointOfInterest.has(`${y},${x}`) && !setObstacleDone.has(`${y},${x}`)) {
      setPointOfInterest.add(`${y},${x}`)
    }

    if (direction === '^') {
      y -= 1
    }
    if (direction === 'v') {
      y += 1
    }
    if (direction === '<') {
      x -= 1
    }
    if (direction === '>') {
      x += 1
    }

    // check if next position is out of bounds, if so, we're done
    if (x < 0 || y < 0 || y > stringArray.length - 1 || x > stringArray[y].length - 1) {
      break
    }

    let nextTile = stringArray[y][x]

    while (nextTile === '#' || nextTile === 'O') {
      if (direction === '^') {
        direction = '>'
        y += 1
      } else if (direction === '>') {
        direction = 'v'
        x -= 1
      } else if (direction === 'v') {
        direction = '<'
        y -= 1
      } else if (direction === '<') {
        direction = '^'
        x += 1
      }
      // else go next position
      if (direction === '^') {
        y -= 1
      }
      if (direction === 'v') {
        y += 1
      }
      if (direction === '<') {
        x -= 1
      }
      if (direction === '>') {
        x += 1
      }
      nextTile = stringArray[y][x]
    }

    i++
  }
  return { positionCount, loop }
}

export function AoC2024Day6(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const startingPosition = '^'

  const inputArray = input.split('\n')

  let colStart = -1
  let rowStart: number

  let obst = 0
  for (let i = 0; i < inputArray.length; i++) {
    colStart = inputArray[i].indexOf(startingPosition)
    if (colStart !== -1) {
      rowStart = i
      break
    }
  }

  for (let i = 0; i < inputArray.length; i++) {
    obst += (inputArray[i].match(/#/g) || []).length
  }

  const startRowStr = [...inputArray[rowStart!]]
  startRowStr[colStart] = 'S'
  inputArray[rowStart!] = startRowStr.join('')

  numberOfObjectOptions = inputArray.length * inputArray[0].length - obst - 1

  const q1ArrayCopy = [...inputArray]
  const { positionCount } = doWalk(q1ArrayCopy, rowStart!, colStart, true)

  setObstacleDone.add(`${rowStart!},${colStart}`)

  while (setPointOfInterest.size > 0) {
    // start putting obstacles at the original path, and add
    setPointOfInterest.forEach((poi) => {
      const [r, c] = poi.split(',').map(Number)
      const currCopy = [...inputArray]
      const currRowStr = [...currCopy[r]]
      currRowStr[c] = 'O'
      currCopy[r] = currRowStr.join('')

      const { loop } = doWalk(currCopy, rowStart!, colStart)

      if (loop) {
        hits.add(`${r},${c}`)
      }
      setPointOfInterest.delete(poi)
      setObstacleDone.add(poi)
      // if (setPointOfInterest.size % 100 === 0) {
      //   console.log(
      //     `done: ${setObstacleDone.size} of ${numberOfObjectOptions}, stack: ${setPointOfInterest.size}, hits: ${hits.size}`
      //   )
      // }
    })
  }

  return { answerQuestion1: positionCount, answerQuestion2: hits.size }
}
