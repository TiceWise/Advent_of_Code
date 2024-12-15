import { Answer } from '../../models/models'

export function AoC2024Day11(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  type Stone = { stone: number; count: number }
  let stones: Stone[] = stringArray[0].split(' ').map((strar) => {
    return { stone: Number(strar), count: 1 }
  })
  // const [p1, p2] = stringArray[0].split(' ').map(Number)

  let countedStones = stones

  let Q1count = 0
  for (let j = 0; j < 75; j++) {
    stones = countedStones
    const newStones = []
    for (let i = 0; i < stones.length; i++) {
      if (stones[i].stone === 0) {
        newStones.push({ stone: 1, count: stones[i].count })
      } else if (stones[i].stone.toString().length % 2 === 0) {
        const str = stones[i].stone.toString()
        newStones.push({ stone: Number(str.slice(0, str.length / 2)), count: stones[i].count })
        newStones.push({
          stone: Number(str.slice(str.length / 2, str.length)),
          count: stones[i].count,
        })
      } else {
        newStones.push({ stone: stones[i].stone * 2024, count: stones[i].count })
      }
    }

    countedStones = []
    while (newStones.length > 0) {
      const curStone = newStones.shift()!
      for (let k = newStones.length - 1; k >= 0; k--) {
        const curOtherStone = newStones[k]
        if (curOtherStone.stone === curStone.stone) {
          curStone.count += curOtherStone.count
          newStones.splice(k, 1)
        }
      }
      countedStones.push(curStone)
    }

    if (j === 24) {
      countedStones.forEach((stone) => {
        Q1count += stone.count
      })
    }
    // const bla = countedStones.map((st) => `${st.count} x ${st.stone}`)
    //
    // console.log(bla)
  }

  let count = 0
  countedStones.forEach((stone) => {
    count += stone.count
  })

  return { answerQuestion1: Q1count, answerQuestion2: count }
}
