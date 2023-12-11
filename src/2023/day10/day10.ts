import { Answer } from '../../models/models'

interface Direction {
  x: -1 | 0 | 1
  y: -1 | 0 | 1
}

const top: Direction = { x: 0, y: -1 }
const right: Direction = { x: 1, y: 0 }
const bottom: Direction = { x: 0, y: 1 }
const left: Direction = { x: -1, y: 0 }

const bottomOpen = ['|', '7', 'F']
const leftOpen = ['-', '7', 'J']
const topOpen = ['|', 'L', 'J']
const rightOpen = ['-', 'F', 'L']

export function AoC2023Day10(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  let startX = -1
  let startY = -1
  // Find S (starting point)
  stringArray.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line.charAt(x) === 'S') {
        startX = x
        startY = y
        break
      }
    }
  })

  // next option is top, right, bottom or left

  let currentX = startX
  let currentY = startY
  let steps = 0
  let heading: 'top' | 'right' | 'bottom' | 'left' | undefined = undefined

  // check next valid move (should be two options for the start, pick the first one)
  // preferably the right hand option
  const rightOption = stringArray[startY + right.y][startX + right.x]
  const bottomOption = stringArray[startY + bottom.y][startX + bottom.x]
  const leftOption = stringArray[startY + left.y][startX + left.x]
  const topOption = stringArray[startY + top.y][startX + top.x]

  const pipeParts: Set<string> = new Set()
  const insideOptions: { x: number; y: number }[] = [] // keep track of 'right hand side'-options

  // perform that move and update step counter, also track the direction we're coming from
  if (bottomOpen.includes(topOption)) {
    currentX = currentX + top.x
    currentY = currentY + top.y
    heading = 'top'
    steps++
  } else if (leftOpen.includes(rightOption)) {
    currentX = currentX + right.x
    currentY = currentY + right.y
    heading = 'right'
    steps++
  } else if (topOpen.includes(bottomOption)) {
    currentX = currentX + bottom.x
    currentY = currentY + bottom.y
    heading = 'bottom'
    steps++
  } else if (rightOpen.includes(leftOption)) {
    currentX = currentX + left.x
    currentY = currentY + left.y
    heading = 'left'
    steps++
  } else {
    console.log('warning, no action after start')
  }

  pipeParts.add(`${currentX},${currentY}`)
  let currentChar

  // keep stepping while not back at start
  while (!(currentX === startX && currentY === startY)) {
    currentChar = stringArray[currentY][currentX]

    if (currentChar === '-') {
      if (heading === 'right') {
        insideOptions.push({ x: currentX + bottom.x, y: currentY + bottom.y })
        currentX = currentX + right.x
        currentY = currentY + right.y
        heading = 'right'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'left') {
        insideOptions.push({ x: currentX + top.x, y: currentY + top.y })
        currentX = currentX + left.x
        currentY = currentY + left.y
        heading = 'left'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    } else if (currentChar === '|') {
      if (heading === 'bottom') {
        insideOptions.push({ x: currentX + left.x, y: currentY + left.y })
        currentX = currentX + bottom.x
        currentY = currentY + bottom.y
        heading = 'bottom'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'top') {
        insideOptions.push({ x: currentX + right.x, y: currentY + right.y })
        currentX = currentX + top.x
        currentY = currentY + top.y
        heading = 'top'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    } else if (currentChar === '7') {
      if (heading === 'right') {
        insideOptions.push({ x: currentX - 1, y: currentY + 1 })
        currentX = currentX + bottom.x
        currentY = currentY + bottom.y
        heading = 'bottom'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'top') {
        insideOptions.push({ x: currentX, y: currentY - 1 })
        insideOptions.push({ x: currentX + 1, y: currentY - 1 })
        insideOptions.push({ x: currentX + 1, y: currentY })
        currentX = currentX + left.x
        currentY = currentY + left.y
        heading = 'left'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    } else if (currentChar === 'J') {
      if (heading === 'bottom') {
        insideOptions.push({ x: currentX - 1, y: currentY - 1 })
        currentX = currentX + left.x
        currentY = currentY + left.y
        heading = 'left'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'right') {
        insideOptions.push({ x: currentX + 1, y: currentY })
        insideOptions.push({ x: currentX + 1, y: currentY + 1 })
        insideOptions.push({ x: currentX, y: currentY + 1 })
        currentX = currentX + top.x
        currentY = currentY + top.y
        heading = 'top'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    } else if (currentChar === 'L') {
      if (heading === 'bottom') {
        insideOptions.push({ x: currentX - 1, y: currentY })
        insideOptions.push({ x: currentX - 1, y: currentY + 1 })
        insideOptions.push({ x: currentX, y: currentY + 1 })
        currentX = currentX + right.x
        currentY = currentY + right.y
        heading = 'right'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'left') {
        insideOptions.push({ x: currentX + 1, y: currentY - 1 })
        currentX = currentX + top.x
        currentY = currentY + top.y
        heading = 'top'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    } else if (currentChar === 'F') {
      if (heading === 'top') {
        insideOptions.push({ x: currentX + 1, y: currentY + 1 })
        currentX = currentX + right.x
        currentY = currentY + right.y
        heading = 'right'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
      if (heading === 'left') {
        insideOptions.push({ x: currentX, y: currentY - 1 })
        insideOptions.push({ x: currentX - 1, y: currentY - 1 })
        insideOptions.push({ x: currentX - 1, y: currentY })
        currentX = currentX + bottom.x
        currentY = currentY + bottom.y
        heading = 'bottom'
        steps++
        pipeParts.add(`${currentX},${currentY}`)
      }
    }
  }

  const answerQuestion1 = steps / 2

  // Part 2

  function floodSearch(
    startX: number,
    startY: number,
    visited: Set<string>
  ): { x: number; y: number } | undefined {
    if (
      startX > stringArray[0].length - 1 ||
      startY > stringArray.length - 1 ||
      startX < 0 ||
      startY < 0
    ) {
      return
    }

    const pos = `${startX},${startY}`

    if (visited.has(pos)) {
      return // Already visited
    }

    if (pipeParts.has(pos)) {
      return // We're at a pipe part, so not an outside
    }

    visited.add(pos)

    floodSearch(startX, startY - 1, visited)
    floodSearch(startX, startY + 1, visited)
    floodSearch(startX - 1, startY, visited)
    floodSearch(startX + 1, startY, visited)
  }

  const insides: Set<string> = new Set()

  // we kept track of possible insiders (right hand side), these could add to the inside options
  insideOptions.forEach((iOption) => {
    floodSearch(iOption.x, iOption.y, insides)
  })

  return {
    answerQuestion1,
    answerQuestion2: insides.size,
  }
}
