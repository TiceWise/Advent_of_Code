import { Answer } from '../../models/models'

export function AoC2023Day11(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const emptyRows: number[] = []
  const emptyCols: number[] = []

  stringArray.forEach((row, index) => {
    if (row.split('').every((char) => char === '.')) {
      emptyRows.push(index)
    }
  })

  for (let col = 0; col < stringArray[0].length; col++) {
    let empty = true
    for (let row = 0; row < stringArray.length; row++) {
      if (stringArray[row][col] === '#') {
        empty = false
        break
      }
    }
    if (empty) {
      emptyCols.push(col)
    }
  }

  const galaxies: { row: number; col: number }[] = []
  stringArray.forEach((row, rowIndex) => {
    row.split('').forEach((char, colIndex) => {
      if (char === '#') {
        galaxies.push({ row: rowIndex, col: colIndex })
      }
    })
  })

  let totalDist = 0
  let totalDist2 = 0

  const expandAmount = 1000000

  for (let gal = 0; gal < galaxies.length; gal++) {
    for (let gal2 = gal; gal2 < galaxies.length; gal2++) {
      const gal1col = galaxies[gal].col
      const gal2col = galaxies[gal2].col
      const gal1row = galaxies[gal].row
      const gal2row = galaxies[gal2].row

      const numberOfEmptyColsCrossed = emptyCols.filter(
        (emptyCol) =>
          (emptyCol > gal1col && emptyCol < gal2col) || (emptyCol > gal2col && emptyCol < gal1col)
      ).length

      const numberOfEmptyRowsCrossed = emptyRows.filter(
        (emptyRow) =>
          (emptyRow > gal1row && emptyRow < gal2row) || (emptyRow > gal2row && emptyRow < gal1row)
      ).length

      totalDist +=
        Math.abs(galaxies[gal].row - galaxies[gal2].row) +
        Math.abs(galaxies[gal].col - galaxies[gal2].col) +
        numberOfEmptyColsCrossed +
        numberOfEmptyRowsCrossed

      totalDist2 +=
        Math.abs(galaxies[gal].row - galaxies[gal2].row) +
        Math.abs(galaxies[gal].col - galaxies[gal2].col) +
        (expandAmount - 1) * numberOfEmptyColsCrossed +
        (expandAmount - 1) * numberOfEmptyRowsCrossed
    }
  }

  const answerQuestion1 = totalDist
  const answerQuestion2 = totalDist2

  return { answerQuestion1, answerQuestion2 }
}
