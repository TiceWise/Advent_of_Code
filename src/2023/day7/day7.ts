import { Answer } from '../../models/models'

interface ProcessedHand {
  handCards: string
  bid: number
  handType: number
}

const HAND_COMBINATION_MAP: Record<string, number> = {
  '5': 1,
  '41': 2,
  '32': 3,
  '311': 4,
  '221': 5,
  '2111': 6,
  '11111': 7,
}

export function AoC2023Day7(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  // ID type of each hand
  const processedHands: ProcessedHand[] = []

  // Part 1
  stringArray.forEach((handLine) => {
    const [handCards, bid] = handLine.split(' ')

    let thisHandCombinations: number[] = []

    let remainingHand = handCards
    while (remainingHand.length > 0) {
      const card = remainingHand[0]
      const cardCount = (remainingHand.match(new RegExp(card, 'gi')) || []).length
      if (cardCount > 0) {
        thisHandCombinations.push(cardCount)
        remainingHand = remainingHand.replace(new RegExp(card, 'gi'), '')
      }
    }

    thisHandCombinations = thisHandCombinations.sort((a, b) => b - a)

    const handType = HAND_COMBINATION_MAP[thisHandCombinations.join('')]

    const processedHand: ProcessedHand = {
      handCards: handCards,
      bid: Number(bid),
      handType: handType,
    }
    processedHands.push(processedHand)
  })

  const sortOrderPart1 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

  const finalOrderPart1 = processedHands.sort((a, b) => {
    return (
      a.handType - b.handType ||
      sortOrderPart1.indexOf(a.handCards[0]) - sortOrderPart1.indexOf(b.handCards[0]) ||
      sortOrderPart1.indexOf(a.handCards[1]) - sortOrderPart1.indexOf(b.handCards[1]) ||
      sortOrderPart1.indexOf(a.handCards[2]) - sortOrderPart1.indexOf(b.handCards[2]) ||
      sortOrderPart1.indexOf(a.handCards[3]) - sortOrderPart1.indexOf(b.handCards[3]) ||
      sortOrderPart1.indexOf(a.handCards[4]) - sortOrderPart1.indexOf(b.handCards[4])
    )
  })

  // console.log(finalOrderPart1)

  let totalResultPart1 = 0
  finalOrderPart1.reverse().forEach((hand, index) => {
    totalResultPart1 += hand.bid * (index + 1)
  })

  const answerQuestion1 = totalResultPart1

  // =========== PART 2 ====================
  //////////////////////////////////////////
  const processedHands2: ProcessedHand[] = []

  stringArray.forEach((handLine) => {
    const [handCards, bid] = handLine.split(' ')

    let thisHandCombinations: number[] = []

    let remainingHand = handCards

    // Resolve jokers
    const jokerCount = (remainingHand.match(new RegExp('J', 'gi')) || []).length //??
    remainingHand = remainingHand.replace(new RegExp('J', 'gi'), '')

    if (jokerCount === 5) {
      thisHandCombinations.push(5)
    }

    while (remainingHand.length > 0) {
      const card = remainingHand[0]
      const cardCount = (remainingHand.match(new RegExp(card, 'gi')) || []).length
      if (cardCount > 0) {
        thisHandCombinations.push(cardCount)
        remainingHand = remainingHand.replace(new RegExp(card, 'gi'), '')
      }
    }

    thisHandCombinations = thisHandCombinations.sort((a, b) => b - a)

    if (jokerCount !== 5) {
      thisHandCombinations[0] += jokerCount
    }
    const handType = HAND_COMBINATION_MAP[thisHandCombinations.join('')]

    const result: ProcessedHand = { handCards: handCards, bid: Number(bid), handType }
    processedHands2.push(result)
  })

  const sortOrderPart2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

  const finalOrderPart2 = processedHands2.sort((a, b) => {
    return (
      a.handType - b.handType ||
      sortOrderPart2.indexOf(a.handCards[0]) - sortOrderPart2.indexOf(b.handCards[0]) ||
      sortOrderPart2.indexOf(a.handCards[1]) - sortOrderPart2.indexOf(b.handCards[1]) ||
      sortOrderPart2.indexOf(a.handCards[2]) - sortOrderPart2.indexOf(b.handCards[2]) ||
      sortOrderPart2.indexOf(a.handCards[3]) - sortOrderPart2.indexOf(b.handCards[3]) ||
      sortOrderPart2.indexOf(a.handCards[4]) - sortOrderPart2.indexOf(b.handCards[4])
    )
  })

  let totalResultPart2 = 0
  finalOrderPart2.reverse().forEach((hand, index) => {
    // console.log(
    //   `hand: ${hand.handCards}, type: ${hand.handType} rank: ${index + 1} * bid: ${
    //     hand.bid
    //   }, result: ${hand.bid * (index + 1)}`
    // )
    totalResultPart2 += hand.bid * (index + 1)
  })

  const answerQuestion2 = totalResultPart2

  return { answerQuestion1, answerQuestion2 }
}
