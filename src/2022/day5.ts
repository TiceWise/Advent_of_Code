interface AnswerText {
  answerQuestion1: string
  answerQuestion2: string
}

export function AoC2022Day5(input: string): AnswerText {
  const dataIn = input.split('\n')

  // read crates
  let lineCount = 0

  // get the line where the 1 is
  while (dataIn[lineCount][1] !== '1') {
    lineCount++
  }
  const numberLine = lineCount

  // initialize crates
  const stackCounts = []
  const crateLocations: number[] = []
  const crates: string[][] = [[]]

  for (let charCount = 0; charCount < dataIn[numberLine].length; charCount++) {
    if (dataIn[numberLine][charCount] >= '0' && dataIn[numberLine][charCount] <= '9') {
      stackCounts.push(parseInt(dataIn[numberLine][charCount]))
      crateLocations.push(charCount)
    }
  }

  for (let i = numberLine - 1; i >= 0; i--) {
    stackCounts.forEach((stack) => {
      // - 1 to offset 1 => 0
      if (dataIn[i][crateLocations[stack - 1]] >= 'A' && dataIn[i][crateLocations[stack - 1]] <= 'Z') {
        if (!crates[stack - 1]) {
          crates[stack - 1] = []
        }
        crates[stack - 1].push(dataIn[i][crateLocations[stack - 1]])
      }
    })
  }

  const startCrates = JSON.parse(JSON.stringify(crates)) // deep copy for part 2

  // read moves
  for (let j = numberLine + 2; j < dataIn.length - 1; j++) {
    const [move, fromTo] = dataIn[j].split(' from ')
    const [, numberToMoveStr] = move.split(' ')
    const [fromStr, toStr] = fromTo.split(' to ')

    const numberToMove = parseInt(numberToMoveStr)
    const from = parseInt(fromStr) - 1 // - 1 to offset 1 => 0
    const to = parseInt(toStr) - 1

    // move one by one
    for (let l = 1; l <= numberToMove; l++) {
      crates[to] = crates[to].concat(crates[from].splice(-1))
    }
  }

  // get answer string; last crate of each array
  let lastCratesStr = ''
  for (let k = 0; k < crates.length; k++) {
    lastCratesStr = lastCratesStr + crates[k].slice(-1)
  }

  // copy starting crates for question 2
  const cratesQ2 = startCrates

  // read moves Question 2
  for (let m = numberLine + 2; m < dataIn.length - 1; m++) {
    const [move, fromTo] = dataIn[m].split(' from ')
    const [, numberToMoveStr] = move.split(' ')
    const [fromStr, toStr] = fromTo.split(' to ')

    const numberToMove = parseInt(numberToMoveStr)
    const from = parseInt(fromStr) - 1 // - 1 to offset 1 => 0
    const to = parseInt(toStr) - 1

    // move all crates at once
    cratesQ2[to] = cratesQ2[to].concat(cratesQ2[from].splice(-numberToMove))
  }

  // get answer string; last crate of each array
  let lastCratesQ2Str = ''
  for (let k = 0; k < cratesQ2.length; k++) {
    lastCratesQ2Str = lastCratesQ2Str + cratesQ2[k].slice(-1)
  }
  return { answerQuestion1: lastCratesStr, answerQuestion2: lastCratesQ2Str }
}
