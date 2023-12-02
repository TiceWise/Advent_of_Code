import { Answer } from '../../models/models'

export function AoC2023Day2(input: string): Answer {
  const stringArray = input.split('\n')

  // remove last empty line
  stringArray.pop()

  let result = 0
  let result2 = 0

  stringArray.forEach((row) => {
    const [gameInfo, sets] = row.split(':')
    const [, gameNumber] = gameInfo.split(' ')
    const gameInt = parseInt(gameNumber)
    const setArray = sets.split('; ')

    const redRegEx = /(?<amount>\d+) red/
    const blueRegEx = /(?<amount>\d+) blue/
    const greenRegEx = /(?<amount>\d+) green/

    let reds = 0
    let blues = 0
    let greens = 0

    setArray.forEach((colorSet) => {
      const redMatch = colorSet.match(redRegEx)
      const blueMatch = colorSet.match(blueRegEx)
      const greenMatch = colorSet.match(greenRegEx)

      const thisReds = parseInt(redMatch?.groups?.amount ?? '0')
      const thisBlues = parseInt(blueMatch?.groups?.amount ?? '0')
      const thisGreens = parseInt(greenMatch?.groups?.amount ?? '0')

      if (thisReds > reds) {
        reds = thisReds
      }
      if (thisBlues > blues) {
        blues = thisBlues
      }
      if (thisGreens > greens) {
        greens = thisGreens
      }
    })

    const maxRed = 12
    const maxGreen = 13
    const maxBlue = 14

    if (reds <= maxRed && greens <= maxGreen && blues <= maxBlue) {
      result += gameInt
    }

    result2 += reds * greens * blues
  })

  const answerQuestion1 = result
  const answerQuestion2 = result2

  return { answerQuestion1, answerQuestion2 }
}
