import { Answer } from '../../models/models'

const setObstacleDone: Set<string> = new Set<string>()
const setPointOfInterest: Set<string> = new Set<string>()
const hits: Set<string> = new Set<string>()
let numberOfObjectOptions: number

function doWalk(stringArray: string[], rowStart: number, colStart: number) {
  let direction: '^' | 'v' | '<' | '>'

  direction = '^'

  const positionCount = 0

  // const maxNumberOfSteps = stringArray.length * stringArray[0].length

  let boopedOCount = 0

  let y = rowStart
  let x = colStart

  let i = 0
  let loop = false

  while (true) {
    if (i > numberOfObjectOptions) {
      // loop = true
      // stringArray.forEach((row) => {
      //   console.log(row)
      // })
      // console.log('hi')
      break
    }
    // const currentTile = stringArray[y][x]
    //
    // if (currentTile === direction) {
    //   loop = true
    //   break
    // }

    if (!setPointOfInterest.has(`${y},${x}`) && !setObstacleDone.has(`${y},${x}`)) {
      setPointOfInterest.add(`${y},${x}`)
    }

    // for q1
    // check if current location is X
    // if (currentTile !== '^' && currentTile !== '>' && currentTile !== 'v' && currentTile !== '<') {
    //   // if not, turn into X and count result + 1
    //   const rowArr = [...stringArray[y]]
    //   rowArr[x] = direction
    //   stringArray[y] = rowArr.join('')
    //   positionCount++
    // }

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

    const nextTile = stringArray[y][x]
    // if # go right, revert previous step

    if (nextTile === 'O') {
      boopedOCount += 1
      if (boopedOCount > 1) {
        loop = true
        break
      }
    }

    if (nextTile === '#' || nextTile === 'O') {
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

  const q1ArrayCopy = [...inputArray]
  const { positionCount } = doWalk(q1ArrayCopy, rowStart!, colStart)

  let options = 0

  setObstacleDone.add(`${rowStart!},${colStart}`)

  // for (let r = 0; r < inputArray.length; r++) {
  //   // if (r % 10 === 0) {
  //   console.log(`row: ${r} of ${inputArray.length}, ${hits.size}, ${options}`)
  //   // }
  //   for (let c = 0; c < inputArray[r].length; c++) {
  //     const currCopy = [...inputArray]
  //     const currentTile = currCopy[r][c]
  //     if (currentTile !== '#' && currentTile !== 'S') {
  //       const currRowStr = [...currCopy[r]]
  //       currRowStr[c] = 'O'
  //       currCopy[r] = currRowStr.join('')
  //
  //       // we could be a bit smarter; start putting obstacles at the original path, and add
  //       const { loop } = doWalk(currCopy, rowStart!, colStart)
  //
  //       if (loop) {
  //         // loop found
  //         options += 1
  //         hits.add(`${r},${c}`)
  //       }
  //     }
  //   }
  // }

  numberOfObjectOptions = inputArray.length * inputArray[0].length - obst - 1

  while (setPointOfInterest.size > 0) {
    setPointOfInterest.forEach((poi) => {
      const [r, c] = poi.split(',').map(Number)
      const currCopy = [...inputArray]
      const currRowStr = [...currCopy[r]]
      currRowStr[c] = 'O'
      currCopy[r] = currRowStr.join('')

      // we could be a bit smarter; start putting obstacles at the original path, and add
      const { loop } = doWalk(currCopy, rowStart!, colStart)

      if (loop) {
        // loop found
        options += 1
        hits.add(`${r},${c}`)
      }
      setPointOfInterest.delete(poi)
      setObstacleDone.add(poi)
      if (setPointOfInterest.size % 25 === 0) {
        console.log(
          `done: ${setObstacleDone.size} of ${numberOfObjectOptions}, stack: ${setPointOfInterest.size}, hits: ${hits.size}`
        )
      }
    })
  }

  console.log(hits.size)
  return { answerQuestion1: positionCount, answerQuestion2: options }
}
