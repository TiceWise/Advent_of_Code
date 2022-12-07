import { AoC2022Day7 } from './day7'

const input =
  '$ cd /\n' +
  '$ ls\n' +
  'dir a\n' +
  '14848514 b.txt\n' +
  '8504156 c.dat\n' +
  'dir d\n' +
  '$ cd a\n' +
  '$ ls\n' +
  'dir e\n' +
  '29116 f\n' +
  '2557 g\n' +
  '62596 h.lst\n' +
  '$ cd e\n' +
  '$ ls\n' +
  '584 i\n' +
  '$ cd ..\n' +
  '$ cd ..\n' +
  '$ cd d\n' +
  '$ ls\n' +
  '4060174 j\n' +
  '8033020 d.log\n' +
  '5626152 d.ext\n' +
  '7214296 k\n' +
  'n'

describe('AoC 2022 day 7', () => {
  it('should correctly answer question 1', () => {
    expect(AoC2022Day7(input).answerQuestion1).toBe(95437)
  })

  it('should correctly answer question 2', () => {
    expect(AoC2022Day7(input).answerQuestion2).toBe(24933642)
  })
})
