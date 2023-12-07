// After completing, refactored with Jetbrains AI Assistant

import { Answer } from '../../models/models'

interface Hand {
  cards: string
  bid: number
  type: number
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

export function AoC2023Day7ref(input: string): Answer {
  input = input.endsWith('\n') ? input.slice(0, -1) : input
  const handLines = input.split('\n')
  const sortOrderGame1 = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  const resultGame1 = calculateResult(handLines, sortOrderGame1, false)

  const sortOrderGame2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
  const resultGame2 = calculateResult(handLines, sortOrderGame2, true)

  return { answerQuestion1: resultGame1, answerQuestion2: resultGame2 }
}

function calculateResult(handLines: string[], sortOrder: string[], isJokerGame: boolean): number {
  const hands: Hand[] = handLines.map((handLine) => {
    const [cards, bidValue] = handLine.split(' ')
    const isJokerHand = isJokerGame && cards.includes('J')
    const handCombination = isJokerHand ? computeHandWithJokers(cards) : computeHand(cards)
    const handType = HAND_COMBINATION_MAP[handCombination.join('')]
    return { cards, bid: Number(bidValue), type: handType }
  })
  const sortedHands = sortHands(hands, sortOrder)
  let totalResult = 0
  sortedHands.reverse().forEach((hand, index) => {
    totalResult += hand.bid * (index + 1)
  })
  return totalResult
}

function computeHandWithJokers(cards: string): number[] {
  const jokerCount = (cards.match(/J/gi) || []).length
  const remainingCards = cards.replace(/J/gi, '')
  const handCombination = computeHand(remainingCards)
  handCombination[0] += jokerCount
  return jokerCount === 5 ? [5] : handCombination
}

function computeHand(remainingHand: string): number[] {
  let handCombinations: number[] = []
  while (remainingHand.length > 0) {
    const card = remainingHand[0]
    const cardCount = (remainingHand.match(new RegExp(card, 'gi')) || []).length
    if (cardCount > 0) {
      handCombinations.push(cardCount)
      remainingHand = remainingHand.replace(new RegExp(card, 'gi'), '')
    }
  }
  handCombinations = handCombinations.sort((a, b) => b - a)
  return handCombinations
}

function sortHands(hands: Hand[], sortOrder: string[]): Hand[] {
  return hands.sort((a, b) => {
    return a.type - b.type || calculateHandOrderDifference(a, b, sortOrder)
  })
}

function calculateHandOrderDifference(a: Hand, b: Hand, sortOrder: string[]): number {
  // alternative for
  // sortOrderPart2.indexOf(a.handCards[0]) - sortOrderPart2.indexOf(b.handCards[0]) ||
  // sortOrderPart2.indexOf(a.handCards[1]) - sortOrderPart2.indexOf(b.handCards[1]) || ...

  let diff = 0
  for (let i = 0; i < a.cards.length; i++) {
    diff += sortOrder.indexOf(a.cards[i]) - sortOrder.indexOf(b.cards[i])
    if (diff !== 0) {
      return diff
    }
  }
  return 0
}
