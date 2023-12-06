import { Answer } from '../../models/models'
import { range } from 'mathjs'

export function AoC2023Day6(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const timeStringIn = stringArray.shift()
  const distanceStringIn = stringArray.shift()

  // Part 1

  const timeStringArray = timeStringIn?.replace(/ +/g, ' ')
  const distanceStringArray = distanceStringIn?.replace(/ +/g, ' ')

  const [, timesStr] = timeStringArray!.split(': ')
  const [, distancesStr] = distanceStringArray!.split(': ')

  const times = timesStr.split(' ').map(Number)
  const distances = distancesStr.split(' ').map(Number)

  let answerQ1 = 1
  times.forEach((time, index) => {
    const recordDistance = distances[index]

    let recordBreaking = 0
    range(0, time + 1).forEach((holdingTime) => {
      const currentDistance = (time - holdingTime) * holdingTime
      if (currentDistance > recordDistance) {
        recordBreaking++
      }
    })
    answerQ1 *= recordBreaking
  })

  const answerQuestion1 = answerQ1

  // Part 2

  const timeStringArray2 = timeStringIn?.replace(/ +/g, '')
  const distanceStringArray2 = distanceStringIn?.replace(/ +/g, '')

  const [, timesStr2] = timeStringArray2!.split(':')
  const [, distancesStr2] = distanceStringArray2!.split(':')

  const time2 = Number(timesStr2)
  const recordDistance2 = Number(distancesStr2)

  let recordBreaking2 = 0

  range(0, time2 + 1).forEach((holdingTime) => {
    const currentDistance = (time2 - holdingTime) * holdingTime
    if (currentDistance > recordDistance2) {
      recordBreaking2++
    }
  })

  const answerQuestion2 = recordBreaking2

  return { answerQuestion1, answerQuestion2 }
}
