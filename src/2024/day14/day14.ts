import { Answer } from '../../models/models'

function positiveModulo(n: number, m: number) {
  return ((n % m) + m) % m
}

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

export async function AoC2024Day14(input: string, test: boolean = false): Promise<Answer> {
  // remove last '\n'
  let ymax, xmax: number
  if (test) {
    ymax = 7
    xmax = 11
  } else {
    ymax = 103
    xmax = 101
  }

  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  type Robot = {
    position: {
      x: number
      y: number
    }
    velocity: {
      x: number
      y: number
    }
  }

  const robots: Robot[] = []
  stringArray.forEach((robot) => {
    const [ps, vs] = robot.split(' ')
    const [, pnums] = ps.split('=')
    const [px, py] = pnums.split(',').map(Number)
    const [, vnums] = vs.split('=')
    const [vx, vy] = vnums.split(',').map(Number)

    robots.push({ position: { x: px, y: py }, velocity: { x: vx, y: vy } })
  })

  // const numberOfRobots = robots.length
  const seconds = 10000

  for (let i = 0; i < seconds; i++) {
    // const uniquePositions: Set<string> = new Set<string>()
    const grid: string[][] = []
    for (let y = 0; y < ymax; y++) {
      grid[y] = new Array(xmax).fill(' ')
    }
    robots.forEach((robot) => {
      // robot.position.x = (robot.position.x + robot.velocity.x) % xmax
      robot.position.x = positiveModulo(robot.position.x + robot.velocity.x, xmax)
      // robot.position.y = (robot.position.y + robot.velocity.y) % ymax
      robot.position.y = positiveModulo(robot.position.y + robot.velocity.y, ymax)

      grid[robot.position.y][robot.position.x] = '#'

      // uniquePositions.add(`${robot.position.x},${robot.position.y}`)
    })

    // if (uniquePositions.size / numberOfRobots > 0.99) {
    //   console.log(new Array(xmax).fill('_').join(''))
    //   grid.forEach((row) => {
    //     console.log(row.join(''))
    //   })
    //   console.log(`second: ${i + 1}, uniqueness: ${uniquePositions.size / numberOfRobots}`)
    //   await sleep(500)
    // }

    // if (i % 10 === 0) {
    //   console.log(`seconds: ${i + 1}`)
    // }
  }

  const midCol = (xmax - 1) / 2 // ??
  const midRow = (ymax - 1) / 2 //??

  let Q1 = 0
  let Q2 = 0
  let Q3 = 0
  let Q4 = 0

  robots.forEach((robot) => {
    if (robot.position.x < midCol && robot.position.y < midRow) {
      Q1++
    }
    if (robot.position.x > midCol && robot.position.y < midRow) {
      Q2++
    }
    if (robot.position.x < midCol && robot.position.y > midRow) {
      Q3++
    }
    if (robot.position.x > midCol && robot.position.y > midRow) {
      Q4++
    }
  })
  return { answerQuestion1: Q1 * Q2 * Q3 * Q4, answerQuestion2: 0 }
}
