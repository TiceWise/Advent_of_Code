const { parentPort, workerData } = require('worker_threads')

const { maps, start, end, worker } = workerData

function solveMap(maps, nextInput) {
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

let lowestLocation = Number.POSITIVE_INFINITY

// const workerTimeLabel = `Worker${worker} time`
// console.time(workerTimeLabel)

// let seedCount = 0

for (let seed = start; seed < end; seed++) {
  const location = solveMap(maps, seed)
  if (location < lowestLocation) {
    lowestLocation = location
  }
  // seedCount++
  // if (seedCount % 50000000 === 0) {
  //   const progress = Math.round((seedCount / (end - start)) * 10000) / 100
  //   console.timeLog(workerTimeLabel)
  //   console.log({ seedCount, progress, trackLowestInput2: lowestLocation })
  // }
}

// console.log(`========= Worker${worker} DONE ==========`)
// console.log({ seedCount, progress: 100, trackLowestInput2: lowestLocation })
//
// console.timeEnd(workerTimeLabel)

parentPort.postMessage(lowestLocation)
