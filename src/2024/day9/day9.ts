import { Answer } from '../../models/models'

export function AoC2024Day9(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const inputArr = [...input]

  const resultArr: (number | null)[] = []

  let numberOfSwaps = 0
  let validNumbers = 0

  let file = true // else free space
  inputArr.forEach((dm, index) => {
    if (file) {
      for (let i = 0; i < Number(dm); i++) {
        resultArr.push(index / 2)
      }
      validNumbers += Number(dm)
    } else {
      for (let i = 0; i < Number(dm); i++) {
        resultArr.push(null)
      }
      numberOfSwaps += Number(dm)
    }
    file = !file
  })

  const popArray = [...resultArr].reverse()

  for (let i = 0; i < numberOfSwaps; i++) {
    const nullInd = resultArr.indexOf(null)

    let popped = null
    while (popped === null) {
      popped = popArray.shift()!
      if (popped === null) {
        i++
      }
    }

    resultArr[nullInd] = popped
  }

  let ansQ1 = 0
  for (let j = 0; j < validNumbers; j++) {
    ansQ1 += j * resultArr[j]!
  }

  type FileOrSpace = { width: number; item: number | null }
  file = true // else free space
  const objArr: FileOrSpace[] = []
  inputArr.forEach((dm, index) => {
    if (file) {
      objArr.push({ width: Number(dm), item: index / 2 })
    } else {
      objArr.push({ width: Number(dm), item: null })
    }
    file = !file
  })

  for (let k = objArr.length - 1; k >= 0; k--) {
    const currentFile = objArr[k]
    if (currentFile.item !== null) {
      for (let l = 0; l < k; l++) {
        const currentSpace = objArr[l]
        if (currentSpace.item === null && currentSpace.width >= currentFile.width) {
          const leftPart: FileOrSpace = { width: currentFile.width, item: null }
          const rightPart: FileOrSpace = {
            width: currentSpace.width - currentFile.width,
            item: null,
          }

          objArr[k] = leftPart
          objArr[l] = currentFile
          objArr.splice(l + 1, 0, rightPart)

          break
        }
      }
    }
  }

  let trackIndex = 0
  let ansQ2 = 0

  for (let m = 0; m < objArr.length; m++) {
    const currentFileOrSpace: FileOrSpace = objArr[m]
    for (let n = 0; n < currentFileOrSpace.width; n++) {
      if (currentFileOrSpace.item !== null) {
        ansQ2 += trackIndex * currentFileOrSpace.item
      }
      trackIndex += 1
    }
  }

  return { answerQuestion1: ansQ1, answerQuestion2: ansQ2 }
}
