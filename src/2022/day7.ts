import { Answer } from '../models/models'

interface File {
  name: string
  parent: Directory
  size: number
}

interface Directory {
  name: string
  parent?: Directory
  children: (File | Directory)[]
  dirSize: number
}

function isFile(item: File | Directory): item is File {
  return (item as File).size !== undefined
}

export function AoC2022Day7(input: string): Answer {
  const dataIn = input.split('\n')

  // remove last '\n' line
  dataIn.pop()

  // $ are commands
  // cd x moves in x
  // cd .. moves out
  // cd / moves to start
  // ls - list all files in dir

  let currentDir: Directory = { name: '', children: [], dirSize: 0 }
  const rootDir: Directory = { name: '/', children: [], dirSize: 0 }

  let doLs = false

  dataIn.forEach((terminalLine) => {
    if (terminalLine[0] === '$') {
      doLs = false
      const command = terminalLine.slice(2)
      const [commandAction, commandInput] = command.split(' ')
      if (commandAction === 'cd') {
        if (commandInput === '/') {
          currentDir = rootDir
        } else if (commandInput === '..') {
          currentDir = currentDir.parent!
        } else {
          currentDir = currentDir.children.find((child) => child.name === commandInput && !isFile(child)) as Directory // fix this force
        }
      } else if (commandAction === 'ls') {
        doLs = true
      }
    } else if (doLs) {
      const [dirOrSize, dirOrFileName] = terminalLine.split(' ')
      if (dirOrSize === 'dir') {
        const childDir = currentDir.children.find((child) => child.name === dirOrFileName && !isFile(child))
        if (!childDir) {
          const newDir = { name: dirOrFileName, children: [], parent: currentDir, dirSize: 0 }
          currentDir.children.push(newDir)
        }
      } else {
        currentDir.children.push({ name: dirOrFileName, parent: currentDir, size: parseInt(dirOrSize) })
      }
    }
  })

  let sumAnswer = 0
  const listOfDirSize: number[] = []

  function getSize(input: File | Directory): number {
    if ('size' in input && input.size !== undefined) {
      return input.size
    } else if ('children' in input) {
      input.children.forEach((child) => {
        input.dirSize += getSize(child)
      })
      if (input.dirSize < 100000) {
        sumAnswer += input.dirSize
      }
      listOfDirSize.push(input.dirSize)
      return input.dirSize
    }
    return 0
  }

  // only run once!
  getSize(rootDir)

  // part 2: smallest we can delete?
  // total disk space: 70000000 = 70 000 000
  // free disk space required: 30000000 = 30 000 000
  const spaceAvailable = 70000000 - rootDir.dirSize
  const spaceRequired = 30000000 - spaceAvailable

  const deleteOptions = listOfDirSize.filter((dirSize) => dirSize > spaceRequired)

  return { answerQuestion1: sumAnswer, answerQuestion2: Math.min(...deleteOptions) }
}
