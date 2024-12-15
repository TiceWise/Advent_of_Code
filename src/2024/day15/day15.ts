import { Answer } from '../../models/models'

const map: string[][] = []
const doubleMap: string[][] = []

function moveBoxes(x: number, y: number, move: string) {
  let xCheck = x
  let yCheck = y

  if (move === '^') {
    yCheck -= 1
  }
  if (move === 'v') {
    yCheck += 1
  }
  if (move === '<') {
    xCheck -= 1
  }
  if (move === '>') {
    xCheck += 1
  }

  let nextTile = map[yCheck][xCheck]

  // options:
  // - wall: ignore
  if (nextTile === '#') {
    return
  }

  // - empty spot: swap
  if (nextTile === '.') {
    // console.log(`${map[yCheck][xCheck]}, ${map[y][x]}`)
    ;[map[yCheck][xCheck], map[y][x]] = [map[y][x], map[yCheck][xCheck]]
    return
  }

  // - box: do move and move boxes
  if (nextTile === 'O') {
    // if next is box, move box first
    moveBoxes(xCheck, yCheck, move)
  }

  // if spot is now free, move box
  nextTile = map[yCheck][xCheck]

  if (nextTile === '.') {
    ;[map[yCheck][xCheck], map[y][x]] = [map[y][x], map[yCheck][xCheck]]
    return
  }
}

function validMove(x: number, y: number, move: string): boolean {
  const xCheck = x
  let yCheck = y

  if (move === '^') {
    yCheck -= 1
  }
  if (move === 'v') {
    yCheck += 1
  }

  let xOtherCheck = -1
  const currentTile = doubleMap[y][x]

  if (currentTile === '[') {
    // we need to check this and right
    xOtherCheck = xCheck + 1
  }
  if (currentTile === ']') {
    // we need to check this and left
    xOtherCheck = xCheck - 1
  }

  const nextTile = doubleMap[yCheck][xCheck]
  const otherNextTile = doubleMap[yCheck][xOtherCheck]

  let valid = false
  if (nextTile === '[' || nextTile === ']') {
    valid = validMove(xCheck, yCheck, move)
  }
  if (otherNextTile === '[' || (otherNextTile === ']' && valid)) {
    valid = validMove(xOtherCheck, yCheck, move)
  }
  if (nextTile === '.' && otherNextTile === '.') {
    valid = true
  }
  return valid
}

function moveDoubleBoxes(x: number, y: number, move: string, valid = false) {
  let xCheck = x
  let yCheck = y

  if (move === '^') {
    yCheck -= 1
  }
  if (move === 'v') {
    yCheck += 1
  }
  if (move === '<') {
    xCheck -= 1
  }
  if (move === '>') {
    xCheck += 1
  }

  let nextTile = doubleMap[yCheck][xCheck]

  // options:
  // - wall: ignore
  if (nextTile === '#') {
    return
  }

  // for left and right, the old mechanism works
  if (move === '<' || move === '>') {
    // - empty spot: swap
    if (nextTile === '.') {
      // console.log(`${map[yCheck][xCheck]}, ${map[y][x]}`)
      ;[doubleMap[yCheck][xCheck], doubleMap[y][x]] = [doubleMap[y][x], doubleMap[yCheck][xCheck]]
      return
    }

    // - box: do move and move boxes
    if (nextTile === '[' || nextTile === ']') {
      // if next is box, move box first
      moveDoubleBoxes(xCheck, yCheck, move)
    }

    nextTile = doubleMap[yCheck][xCheck]

    if (nextTile === '.') {
      ;[doubleMap[yCheck][xCheck], doubleMap[y][x]] = [doubleMap[y][x], doubleMap[yCheck][xCheck]]
      return
    }
  }
  // if we move up or down, we should check for all boxes that we are moving if they have a free space, if so,
  // move them all, if not we don't move
  if (move === '^' || move === 'v') {
    const currentTile = doubleMap[y][x]

    let xOtherCheck = -1
    if (currentTile === '[') {
      // we need to check this and right
      xOtherCheck = xCheck + 1
    }
    if (currentTile === ']') {
      // we need to check this and left
      xOtherCheck = xCheck - 1
    }

    let otherNextTile = doubleMap[yCheck][xOtherCheck]

    // check if it's even a legal move in the end, to prevent we shift the left box alone, so all boxes above/below must be allowed to move
    // next two must be dot, if not, check those

    // - empty spot: swap
    if (!valid) {
      valid = validMove(x, y, move)
    }
    if (valid) {
      if (nextTile === '.' && otherNextTile === '.') {
        ;[doubleMap[yCheck][xCheck], doubleMap[y][x]] = [doubleMap[y][x], doubleMap[yCheck][xCheck]]

        if (currentTile === '[') {
          // we need to check this and right
          ;[doubleMap[yCheck][xOtherCheck], doubleMap[y][x + 1]] = [
            doubleMap[y][x + 1],
            doubleMap[yCheck][xOtherCheck],
          ]
        }
        if (currentTile === ']') {
          // we need to check this and left
          ;[doubleMap[yCheck][xOtherCheck], doubleMap[y][x - 1]] = [
            doubleMap[y][x - 1],
            doubleMap[yCheck][xOtherCheck],
          ]
        }
        return
      }

      // - box: do move and move boxes
      if (nextTile === '[' || nextTile === ']' || otherNextTile === '[' || otherNextTile === ']') {
        // if next is box, move box first
        moveDoubleBoxes(xCheck, yCheck, move, valid)
        moveDoubleBoxes(xOtherCheck, yCheck, move, valid)
      }

      otherNextTile = doubleMap[yCheck][xOtherCheck]
      nextTile = doubleMap[yCheck][xCheck]

      if (nextTile === '.' && otherNextTile === '.') {
        ;[doubleMap[yCheck][xCheck], doubleMap[y][x]] = [doubleMap[y][x], doubleMap[yCheck][xCheck]]

        if (currentTile === '[') {
          // we need to check this and right
          ;[doubleMap[yCheck][xOtherCheck], doubleMap[y][x + 1]] = [
            doubleMap[y][x + 1],
            doubleMap[yCheck][xOtherCheck],
          ]
        }
        if (currentTile === ']') {
          // we need to check this and left
          ;[doubleMap[yCheck][xOtherCheck], doubleMap[y][x - 1]] = [
            doubleMap[y][x - 1],
            doubleMap[yCheck][xOtherCheck],
          ]
        }
        return
      }
    }
  }
}

export function AoC2024Day15(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const [mapRaw, moves] = input.split('\n\n')

  const mapString = mapRaw.split('\n')

  const startingPosition = '@'
  let xStart = -1
  let yStart: number

  for (let i = 0; i < mapString.length; i++) {
    xStart = mapString[i].indexOf(startingPosition)
    if (xStart !== -1) {
      yStart = i
      break
    }
  }

  if (!yStart!) {
    throw new Error('start not found')
  }

  for (let i = 0; i < mapString.length; i++) {
    map.push(mapString[i].split(''))
  }

  map[yStart][xStart] = '.'

  let yActual = yStart
  let xActual = xStart
  let nextTile

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    let xCheck = xActual
    let yCheck = yActual

    if (move === '^') {
      yCheck -= 1
    }
    if (move === 'v') {
      yCheck += 1
    }
    if (move === '<') {
      xCheck -= 1
    }
    if (move === '>') {
      xCheck += 1
    }

    nextTile = map[yCheck][xCheck]

    // options:
    // - wall: ignore
    if (nextTile === '#') {
      continue
    }

    // - empty spot: do move
    if (nextTile === '.') {
      xActual = xCheck
      yActual = yCheck
    }

    // - box: do move and move boxes
    if (nextTile === 'O') {
      // if next is box, move box first
      moveBoxes(xCheck, yCheck, move)

      // if spot is now free, move box
      nextTile = map[yCheck][xCheck]

      if (nextTile === '.') {
        xActual = xCheck
        yActual = yCheck
      }
    }
  }

  // console.log(`${yStart!},${xStart}`)

  let gps = 0

  map.forEach((row, y) => {
    // console.log(row.join(''))
    row.forEach((char, x) => {
      if (char === 'O') {
        gps = gps + 100 * y + x
      }
    })
  })

  // ============ Q2 ==============

  const doubleMapStr: string[] = []

  mapString.forEach((row) => {
    const doubleRow: string[] = []
    row.split('').forEach((char) => {
      // console.log(char)
      if (char === '#') {
        doubleRow.push('##')
      }
      if (char === 'O') {
        doubleRow.push('[]')
      }
      if (char === '.') {
        doubleRow.push('..')
      }
      if (char === '@') {
        doubleRow.push('@.')
      }
    })
    doubleMapStr.push(doubleRow.join(''))
  })

  let xStartQ2 = -1
  let yStartQ2: number

  for (let i = 0; i < doubleMapStr.length; i++) {
    xStartQ2 = doubleMapStr[i].indexOf(startingPosition)
    if (xStartQ2 !== -1) {
      yStartQ2 = i
      break
    }
  }

  if (!yStartQ2!) {
    throw new Error('start not found')
  }

  for (let i = 0; i < doubleMapStr.length; i++) {
    doubleMap.push(doubleMapStr[i].split(''))
  }

  doubleMap[yStartQ2][xStartQ2] = '.'

  yActual = yStartQ2
  xActual = xStartQ2

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i]
    let xCheck = xActual
    let yCheck = yActual

    if (move === '^') {
      yCheck -= 1
    }
    if (move === 'v') {
      yCheck += 1
    }
    if (move === '<') {
      xCheck -= 1
    }
    if (move === '>') {
      xCheck += 1
    }

    nextTile = doubleMap[yCheck][xCheck]

    // options:
    // - wall: ignore
    if (nextTile === '#') {
      continue
    }

    // - empty spot: do move
    if (nextTile === '.') {
      xActual = xCheck
      yActual = yCheck
    }

    // - box: do move and move boxes
    if (nextTile === '[' || nextTile === ']') {
      // if next is box, move box first
      moveDoubleBoxes(xCheck, yCheck, move)

      // if spot is now free, move box
      nextTile = doubleMap[yCheck][xCheck]

      if (nextTile === '.') {
        xActual = xCheck
        yActual = yCheck
      }
    }
    doubleMap[yActual][xActual] = move
    doubleMap.forEach((row, i) => console.log(i + ' ' + row.join('')))
    doubleMap[yActual][xActual] = '.'
  }

  // doubleMap.forEach((row, i) => console.log(i + ' ' + row.join('')))

  let gpsQ2 = 0
  doubleMap.forEach((row, y) => {
    // console.log(row.join(''))
    row.forEach((char, x) => {
      if (char === '[') {
        gpsQ2 = gpsQ2 + 100 * y + x
      }
    })
  })

  return { answerQuestion1: gps, answerQuestion2: gpsQ2 }
}
