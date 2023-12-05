import { Answer } from '../../models/models'

export function solveMap(maps: number[][][], nextInput: number) {
  for (let j = 0; j < maps.length; j++) {
    const mapRows = maps[j]
    for (let i = 0; i < mapRows.length; i++) {
      const mapRow = mapRows[i]
      const [destinationStart, sourceStart, rangeLength] = mapRow
      if (nextInput >= sourceStart && nextInput < sourceStart + rangeLength) {
        nextInput = nextInput + (destinationStart - sourceStart)
        break
      }
    }
  }
  return nextInput
}

export function solveFlippedMap(maps: number[][][], nextInput: number) {
  for (let j = maps.length - 1; j >= 0; j--) {
    const mapRows = maps[j]
    for (let i = mapRows.length - 1; i >= 0; i--) {
      const mapRow = mapRows[i]
      const [destinationStart, sourceStart, rangeLength] = mapRow
      if (nextInput >= destinationStart && nextInput < destinationStart + rangeLength) {
        nextInput = nextInput + (sourceStart - destinationStart)
        break
      }
    }
  }
  return nextInput
}

export function AoC2023Day5(input: string): Answer {
  // remove last '\n'
  if (input.lastIndexOf('\n') === input.length - 1) {
    input = input.slice(0, -1)
  }

  const mapStrings = input.split('\n\n')

  const seedsString = mapStrings.shift()

  const [, seedsArr] = seedsString?.split(': ') ?? ''

  const seeds = seedsArr.split(' ').map(Number)

  // create numbers map
  const maps = mapStrings.map((mapString) => {
    const mapRows = mapString.split('\n')
    mapRows.shift()
    return mapRows.map((mapRow) => {
      return mapRow.split(' ').map(Number)
    })
  })

  let lowestLocation1 = Number.POSITIVE_INFINITY

  seeds.forEach((seed) => {
    const location = solveMap(maps, seed)

    if (location < lowestLocation1) {
      lowestLocation1 = location
    }
  })

  const answerQuestion1 = lowestLocation1

  let lowestLocation2 = Number.POSITIVE_INFINITY

  console.time('Checking Backwards')

  for (let location = 0; location < 3000000000; location++) {
    const originalSeed = solveFlippedMap(maps, location)
    // check if original input is in any range; that's our lowest possible value
    for (let k = 0; k < seeds.length; k += 2) {
      const start = seeds[k]
      const end = seeds[k] + seeds[k + 1]
      if (originalSeed >= start && originalSeed < end) {
        lowestLocation2 = location
        break
      }
    }
    // stop if we've found a value
    if (lowestLocation2 < Number.POSITIVE_INFINITY) {
      break
    }
  }
  console.timeEnd('Checking Backwards')

  return { answerQuestion1, answerQuestion2: lowestLocation2 }

  /* BRUTEFORCE
  const workerPromises: Promise<number>[] = []

  for (let k = 0; k < seeds.length; k += 2) {
    const start = seeds[k]
    const end = seeds[k] + seeds[k + 1]

    const worker = new Worker('./src/2023/day5/worker.js', {
      workerData: { maps, start, end, worker: k / 2 },
    })

    const promise: Promise<number> = new Promise((resolve) => {
      worker.on('message', (result) => {
        resolve(result)
      })
    })

    workerPromises.push(promise)
  }

  const results = await Promise.all(workerPromises)

  const answerQuestion2 = Math.min(...results)

  return { answerQuestion1, answerQuestion2 }

   */
}
