import { Answer } from '../../models/models'

function reverse(s: string) {
  return s.split('').reverse().join('')
}

export function AoC2023Day1(input: string): Answer {
  const stringArray = input.split('\n')

  stringArray.pop()

  let result = 0
  stringArray.forEach((str) => {
    for (let i = 0; i < str.length; i++) {
      const curChar = str.charAt(i)
      if (!isNaN(parseInt(curChar))) {
        result = result + 10 * parseInt(curChar)
        break
      }
    }
    for (let i = str.length - 1; i >= 0; i--) {
      const curChar = str.charAt(i)
      if (!isNaN(parseInt(curChar))) {
        result = result + parseInt(curChar)
        break
      }
    }
  })

  const writtenNumbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]

  const numNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  let resultQ2 = 0
  stringArray.forEach((str) => {
    let i = Number.POSITIVE_INFINITY
    let digit = 100
    writtenNumbers.forEach((wn, curDigit) => {
      // console.log(str.indexOf(wn))
      const curIn = str.indexOf(wn)
      if (curIn < i && curIn >= 0) {
        i = curIn
        digit = curDigit
      }
    })
    numNums.forEach((nn, curDigit) => {
      // console.log(str.indexOf(wn))
      const curIn = str.indexOf(nn.toString())
      if (curIn < i && curIn >= 0) {
        i = curIn
        digit = curDigit
      }
    })
    resultQ2 = resultQ2 + 10 * digit
  })

  stringArray.forEach((str) => {
    let i = Number.POSITIVE_INFINITY
    // console.log(str)
    let digit = 100
    writtenNumbers.forEach((wn, curDigit) => {
      // console.log(str.indexOf(wn))
      const curIn = reverse(str).indexOf(reverse(wn))
      if (curIn < i && curIn >= 0) {
        i = curIn
        digit = curDigit
      }
    })
    numNums.forEach((nn, curDigit) => {
      // console.log(str.indexOf(wn))
      const curIn = reverse(str).indexOf(nn.toString())
      if (curIn < i && curIn >= 0) {
        i = curIn
        digit = curDigit
      }
    })
    // console.log(digit)
    resultQ2 = resultQ2 + digit
  })

  const answerQuestion1 = result
  const answerQuestion2 = resultQ2

  return { answerQuestion1, answerQuestion2 }
}
