import { Answer } from '../../models/models'

function arraysEqual(a: number[], b: number[]) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export function AoC2023Day12(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')
  // const options: number[] = []

  let totalCount = 0

  stringArray.forEach((line) => {
    const [puzzle, input] = line.split(' ')
    const arrangement = input.split(',').map(Number)
    // also set contents? maybe or must? ?? vs ?#

    // const questionMarks = []
    // for (let i = 0; i < puzzle.length; i++) {
    //   if (puzzle[i] === '?') questionMarks.push(i)
    // }

    // puzzle = puzzle.replaceAll('?', '.')
    // try all '.' / '#' combinations on a questionMark and in a puzzle check if the result is the same as the arrangement recursively

    // TODO: don't return the result but return the count, dynamic program that

    const options = ['.', '#']
    function generateCombinations(
      chars: string[],
      index: number,
      result: string[],
      results: string[]
    ) {
      if (index === chars.length) {
        if (
          arraysEqual(
            result
              .join('')
              .split('.')
              .filter((puz) => puz !== '')
              .map((puz) => puz.length),
            arrangement
          )
        ) {
          totalCount++
        }

        results.push(result.join(''))
        return
      }
      if (chars[index] === '?') {
        options.forEach((item) => {
          result[index] = item
          generateCombinations(chars, index + 1, result, results)
        })
      } else {
        result[index] = chars[index]
        generateCombinations(chars, index + 1, result, results)
      }

      return
    }

    const results: string[] = []
    generateCombinations(puzzle.split(''), 0, new Array(puzzle.length), results)
  })

  const answerQuestion1 = totalCount
  const answerQuestion2 = 0

  return { answerQuestion1, answerQuestion2 }
}
