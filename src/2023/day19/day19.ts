import { Answer } from '../../models/models'

interface Condition {
  category: 'x' | 'm' | 'a' | 's'
  check: '<' | '>'
  value: number
  nextWorkFlow: string
}

interface FallBackCondition {
  nextWorkFlow: string
}

interface Workflow {
  name: string
  conditions: (Condition | FallBackCondition)[]
}

interface XMASValues {
  [key: string]: number
}

export function AoC2023Day19(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const [rawWorkflows, objects] = input.split('\n\n')

  const workflows: Workflow[] = []

  rawWorkflows.split('\n').forEach((workflow) => {
    const [name, rawConditions] = workflow.split('{')

    const strConditions = rawConditions.slice(0, -1).split(',')
    const fallBackConditionStr = strConditions.pop()

    const conditions: (Condition | FallBackCondition)[] = strConditions.map((strCond) => {
      const parser = /^(?<category>[xmas])(?<check>[<>])(?<value>\d+):(?<nextWorkFlow>[a-zAR]+)$/
      const parsed = strCond.match(parser)
      return {
        category: parsed!.groups!.category,
        check: parsed!.groups!.check,
        nextWorkFlow: parsed!.groups!.nextWorkFlow,
        value: parseInt(parsed!.groups!.value!),
      }
    })

    conditions.push({ nextWorkFlow: fallBackConditionStr! })
    workflows.push({ name, conditions })
  })

  let answerQuestion1 = 0

  objects.split('\n').forEach((object) => {
    const parser = /^\{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}$/
    const parsed = object.match(parser)

    const xmas: XMASValues = {}

    xmas['x'] = parseInt(parsed!.groups!.x!)
    xmas['m'] = parseInt(parsed!.groups!.m!)
    xmas['a'] = parseInt(parsed!.groups!.a!)
    xmas['s'] = parseInt(parsed!.groups!.s!)

    let nextWorkFlow: string = 'in'

    while (!(nextWorkFlow === 'R' || nextWorkFlow === 'A')) {
      const currentWorkflow = workflows.find((workflow) => workflow.name === nextWorkFlow)

      if (!currentWorkflow?.conditions || currentWorkflow?.conditions.length === 0) {
        console.error('no conditions for current flow?')
        break
      }

      for (let i = 0; i < currentWorkflow?.conditions.length; i++) {
        const currentCondition = currentWorkflow.conditions[i] as Condition
        // fallback
        if (i === currentWorkflow.conditions.length - 1) {
          nextWorkFlow = currentCondition.nextWorkFlow
          break
        } else {
          const checkingValue = xmas[currentCondition.category]
          if (currentCondition.check === '>' && checkingValue > currentCondition.value) {
            nextWorkFlow = currentCondition.nextWorkFlow
            break
          } else if (currentCondition.check === '<' && checkingValue < currentCondition.value) {
            nextWorkFlow = currentCondition.nextWorkFlow
            break
          }
        }
      }
    }

    if (nextWorkFlow === 'A') {
      answerQuestion1 += xmas['x'] + xmas['m'] + xmas['a'] + xmas['s']
      // console.log(object)
    }
  })

  // const answerQuestion2 = 0

  // starting with 'in'; 1350 (* 4000 * 4000 * 4000) go to px, the rest go to qqz
  const nextWorkFlow = 'in'

  const numberAccepter = recurse(nextWorkFlow, [])

  function recurse(nextWorkFlow: string, history: (Condition | FallBackCondition)[]): number {
    // console.log(nextWorkFlow, history)
    if (nextWorkFlow === 'A') {
      // console.log(history)
      // of x, m, a and s, check min and max values and multiply options
      const xmas_min: XMASValues = {}
      const xmas_max: XMASValues = {}

      xmas_min['x'] = 1
      xmas_min['m'] = 1
      xmas_min['a'] = 1
      xmas_min['s'] = 1

      xmas_max['x'] = 4000
      xmas_max['m'] = 4000
      xmas_max['a'] = 4000
      xmas_max['s'] = 4000

      history.forEach((cond) => {
        if ('check' in cond) {
          if (cond.check === '<') {
            if (cond.value < xmas_max[cond.category]) {
              xmas_max[cond.category] = cond.value - 1
            }
          } else if (cond.check === '>') {
            if (cond.value > xmas_min[cond.category]) {
              xmas_min[cond.category] = cond.value + 1
            }
          }
        }
      })

      // const options =
      //   (xmas_max['x'] - xmas_min['x'] + 1) *
      //   (xmas_max['m'] - xmas_min['m'] + 1) *
      //   (xmas_max['a'] - xmas_min['a'] + 1) *
      //   (xmas_max['s'] - xmas_min['s'] + 1)
      // console.log(
      //   `{'x': (${xmas_min['x']}, ${xmas_max['x']}), 'm': (${xmas_min['m']}, ${xmas_max['m']}), 'a': (${xmas_min['a']}, ${xmas_max['a']}), 's': (${xmas_min['s']}, ${xmas_max['s']})} => ${options}`
      // )
      // return options
    }
    if (nextWorkFlow === 'R') {
      return 0
    }

    const currentWorkflow = workflows.find((workflow) => workflow.name === nextWorkFlow)

    const predecessors: (Condition | FallBackCondition)[] = []

    return currentWorkflow?.conditions.reduce((prevVal, curVal) => {
      // console.log(curVal)

      if ('check' in curVal) {
        if (curVal.check === '<') {
          predecessors.push({ ...curVal, check: '>', value: curVal.value - 1 })
        } else if (curVal.check === '>') {
          predecessors.push({ ...curVal, check: '<', value: curVal.value })
        }
      }

      return (
        prevVal + recurse(curVal.nextWorkFlow, [...history, ...predecessors.slice(0, -1), curVal])
      )
    }, 0) as number
  }

  return { answerQuestion1, answerQuestion2: numberAccepter }
}
