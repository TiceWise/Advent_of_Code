import { Answer } from '../../models/models'

export function AoC2024Day13(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n\n')

  const aCost = 3
  const bCost = 1

  let totalCost = 0
  let totalCostQ2 = 0

  stringArray.forEach((puzzle) => {
    const [astr, bstr, pstr] = puzzle.split('\n') //??

    const [axstr, aYVelStr] = astr.split(', Y+')
    const [, aXVelStr] = axstr.split('X+')
    const aYVel = Number(aYVelStr)
    const aXVel = Number(aXVelStr)

    const [bxstr, bYVelStr] = bstr.split(', Y+')
    const [, bXVelStr] = bxstr.split('X+')
    const bYVel = Number(bYVelStr)
    const bXVel = Number(bXVelStr)

    const [pxstr, pYVelStr] = pstr.split(', Y=')
    const [, pXVelStr] = pxstr.split('X=')

    const pYVel = Number(pYVelStr)
    const pXVel = Number(pXVelStr)

    const pYVelQ2 = Number(pYVelStr) + 10000000000000
    const pXVelQ2 = Number(pXVelStr) + 10000000000000

    // for (let a = 0; a < 100; a++) {
    //   for (let b = 0; b < 100; b++) {
    //     if (a * aXVel + b * bXVel === pXVel && a * aYVel + b * bYVel === pYVel) {
    //       const curCost = a * aCost + b * bCost
    //       if (curCost < lowestCost) {
    //         const
    //         lowestCost = curCost
    //       }
    //     }
    //   }
    // }
    //
    // if (lowestCost < Infinity) {
    //   totalCost += lowestCost
    // }

    // 2 unknowns, 6 knowns, should be solvable, solve for b and a
    const b = (aXVel * pYVel - aYVel * pXVel) / (aXVel * bYVel - aYVel * bXVel)
    const a = (pXVel - b * bXVel) / aXVel

    if (a > 0 && b > 0 && a % 1 === 0 && b % 1 === 0) {
      totalCost += a * aCost + b * bCost
    }

    const bQ2 = (aXVel * pYVelQ2 - aYVel * pXVelQ2) / (aXVel * bYVel - aYVel * bXVel)
    const aQ2 = (pXVelQ2 - bQ2 * bXVel) / aXVel

    if (aQ2 > 0 && bQ2 > 0 && aQ2 % 1 === 0 && bQ2 % 1 === 0) {
      totalCostQ2 += aQ2 * aCost + bQ2 * bCost
    }
  })

  return { answerQuestion1: totalCost, answerQuestion2: totalCostQ2 }
}
