import { Answer } from '../../models/models'

export function AoC2024Day8(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const antennaTypes: Set<string> = new Set<string>()

  stringArray.forEach((row) => {
    ;[...row].forEach((char) => {
      if (char !== '.' && !antennaTypes.has(char)) {
        antennaTypes.add(char)
      }
    })
  })

  const nodAntLoc = new Set()
  const nodLoc = new Set()
  const nodLocQ2 = new Set()

  antennaTypes.forEach((antenna) => {
    const locations: number[][] = []
    stringArray.forEach((row, r) => {
      ;[...row].forEach((char, c) => {
        if (char === antenna) {
          locations.push([r, c])
        }
      })
    })
    // combine each with each and determine if they are in the map
    // each combi creates two nodes
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const rdif = locations[i][0] - locations[j][0]
        // if rdif is negative, j is below i, so add to diff to j and substract from i, else, other way around
        const cdif = locations[i][1] - locations[j][1]
        // if cdif is negative, j is right of i, so add to j and substract from i, else, other way around

        const nodLoc1r = locations[i][0] + rdif
        const nodLoc2r = locations[j][0] - rdif

        const nodLoc1c = locations[i][1] + cdif
        const nodLoc2c = locations[j][1] - cdif

        if (
          nodLoc1r >= 0 &&
          nodLoc1r < stringArray.length &&
          nodLoc1c >= 0 &&
          nodLoc1c < stringArray[0].length
        ) {
          // console.log(
          //   `${antenna}: i${i}:${locations[i]} <> j${j}:${locations[j]} => ${nodLoc1r},${nodLoc1c}`
          // )
          nodAntLoc.add(`${antenna}:${nodLoc1r},${nodLoc1c}`)
          nodLoc.add(`${nodLoc1r},${nodLoc1c}`)
        }

        if (
          nodLoc2r >= 0 &&
          nodLoc2r < stringArray.length &&
          nodLoc2c >= 0 &&
          nodLoc2c < stringArray[0].length
        ) {
          // console.log(
          //   `${antenna}: i${i}:${locations[i]} <> j${j}:${locations[j]} => ${nodLoc2r},${nodLoc2c}`
          // )
          nodAntLoc.add(`${antenna}:${nodLoc2r},${nodLoc2c}`)
          nodLoc.add(`${nodLoc2r},${nodLoc2c}`)
        }
      }
    }

    /// Q2

    for (let i = 0; i < locations.length; i++) {
      // now also at each tower!
      nodLocQ2.add(`${locations[i][0]},${locations[i][1]}`)
      for (let j = i + 1; j < locations.length; j++) {
        const rdif = locations[i][0] - locations[j][0]
        // if rdif is negative, j is below i, so add to diff to j and substract from i, else, other way around
        const cdif = locations[i][1] - locations[j][1]
        // if cdif is negative, j is right of i, so add to j and substract from i, else, other way around

        let nodLoc1r = locations[i][0] + rdif
        let nodLoc1c = locations[i][1] + cdif

        while (
          nodLoc1r >= 0 &&
          nodLoc1r < stringArray.length &&
          nodLoc1c >= 0 &&
          nodLoc1c < stringArray[0].length
        ) {
          nodLocQ2.add(`${nodLoc1r},${nodLoc1c}`)
          // console.log(
          //   `${antenna}-1: i${i}:${locations[i]} =(${rdif},${cdif})=> ${nodLoc1r},${nodLoc1c}`
          // )
          nodLoc1r = nodLoc1r + rdif
          nodLoc1c = nodLoc1c + cdif
        }

        let nodLoc2r = locations[j][0] - rdif
        let nodLoc2c = locations[j][1] - cdif

        while (
          nodLoc2r >= 0 &&
          nodLoc2r < stringArray.length &&
          nodLoc2c >= 0 &&
          nodLoc2c < stringArray[0].length
        ) {
          nodLocQ2.add(`${nodLoc2r},${nodLoc2c}`)
          // console.log(
          //   `${antenna}-2: j${j}:${locations[j]} =(${-rdif},${-cdif})=> ${nodLoc2r},${nodLoc2c}`
          // )
          nodLoc2r = nodLoc2r - rdif
          nodLoc2c = nodLoc2c - cdif
        }
      }
    }
  })

  return { answerQuestion1: nodLoc.size, answerQuestion2: nodLocQ2.size }
}
