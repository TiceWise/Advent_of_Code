import { Answer } from '../models/models'
import * as math from 'mathjs'

interface Monkey {
  items: number[]
  operation: string
  testDivisibleBy: number
  trueThrowTo: number
  falseThrowTo: number
  itemsInspected: number
}

function monkeyBusiness(numberOfRounds: number, monkeys: Monkey[], divider: number, parser: math.Parser) {
  for (let round = 1; round <= numberOfRounds; round++) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length) {
        monkey.itemsInspected++
        const currentItem = monkey.items.shift()
        parser.evaluate(`old = ${currentItem}`)
        // bored

        let newWorryLevel
        // not the most reusable check, but fine for now
        if (divider === 3) {
          newWorryLevel = Math.floor(parser.evaluate(monkey.operation) / divider)
        } else {
          newWorryLevel = parser.evaluate(monkey.operation) % divider
        }

        if (newWorryLevel % monkey.testDivisibleBy === 0) {
          monkeys[monkey.trueThrowTo].items.push(newWorryLevel)
        } else {
          monkeys[monkey.falseThrowTo].items.push(newWorryLevel)
        }
      }
    })
    // if (round === 1 || round === 20 || round % 1000 === 0) {
    // console.log(`=== after round ${round}`)
    // console.log(monkeys)
    // }
  }
  return monkeys.sort((a, b) => (a.itemsInspected < b.itemsInspected ? 1 : -1))
}

export function AoC2022Day11(input: string): Answer {
  const dataIn = input.split('\n')

  const linesPerMonkey = 7
  const numberOfMonkeys = Math.floor(dataIn.length / linesPerMonkey)

  const monkeys: Monkey[] = []

  // Parse input
  for (let monkey = 0; monkey < numberOfMonkeys; monkey++) {
    const itemLine = monkey * linesPerMonkey + 1
    const operationLine = monkey * linesPerMonkey + 2
    const testLine = monkey * linesPerMonkey + 3
    const trueLine = monkey * linesPerMonkey + 4
    const falseLine = monkey * linesPerMonkey + 5

    const [, rawItems] = dataIn[itemLine].split(': ')
    const items = rawItems.split(', ').map(Number)

    const [, operation] = dataIn[operationLine].split(': ')

    const [, divBy] = dataIn[testLine].split(' by ')
    const testDivisibleBy = parseInt(divBy)

    const [, trueTo] = dataIn[trueLine].split(' monkey ')
    const trueThrowTo = parseInt(trueTo)

    const [, falseTo] = dataIn[falseLine].split(' monkey ')
    const falseThrowTo = parseInt(falseTo)

    const currentMonkey: Monkey = {
      items,
      operation,
      testDivisibleBy,
      trueThrowTo,
      falseThrowTo,
      itemsInspected: 0,
    }

    monkeys.push(currentMonkey)
  }

  // deep monkeys for question 2
  const originalMonkeys = JSON.parse(JSON.stringify(monkeys))

  const parser = math.parser()

  // Question 1
  let numberOfRounds = 20
  let divider = 3
  const sortedMonkeysQ1 = monkeyBusiness(numberOfRounds, monkeys, divider, parser)

  // Question 2
  numberOfRounds = 10000
  divider = 1
  monkeys.forEach((monkey) => {
    divider = divider * monkey.testDivisibleBy
  })

  const sortedMonkeysQ2 = monkeyBusiness(numberOfRounds, originalMonkeys, divider, parser)

  return {
    answerQuestion1: sortedMonkeysQ1[0].itemsInspected * sortedMonkeysQ1[1].itemsInspected,
    answerQuestion2: sortedMonkeysQ2[0].itemsInspected * sortedMonkeysQ2[1].itemsInspected,
  }
}
