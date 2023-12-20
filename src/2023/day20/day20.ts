import { Answer } from '../../models/models'

enum ModuleType {
  FlipFlop = 'FlipFlop',
  Conjunction = 'Conjunction',
  Broadcast = 'Broadcast',
  Button = 'Button',
}

interface Module {
  name: string
  destinationNames: string[]
  type: ModuleType
  onOrOff?: boolean
  lastPulses?: Pulse[]
}

interface Pulse {
  originName: string
  destinationName: string
  highOrLow: boolean
}

export function AoC2023Day20(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  // initialize
  const modules: Module[] = []
  modules.push({ name: 'button', destinationNames: ['broadcaster'], type: ModuleType.Button })

  const pulseStack: Pulse[] = []
  pulseStack.push({ originName: 'button', destinationName: 'broadcaster', highOrLow: false })

  stringArray.forEach((line) => {
    const [typeAndNameStr, destinationsStr] = line.split(' -> ')
    const destinations = destinationsStr.split(', ')
    if (typeAndNameStr === 'broadcaster') {
      modules.push({
        name: 'broadcaster',
        type: ModuleType.Broadcast,
        destinationNames: destinations,
      })
    } else {
      const typeAndNameArr: string[] = typeAndNameStr.split('')
      const moduleType = typeAndNameArr.shift()
      const moduleName = typeAndNameArr.join('')

      if (moduleType === '%') {
        modules.push({
          name: moduleName,
          type: ModuleType.FlipFlop,
          destinationNames: destinations,
          onOrOff: false,
        })
      } else if (moduleType === '&') {
        modules.push({
          name: moduleName,
          type: ModuleType.Conjunction,
          destinationNames: destinations,
          lastPulses: [],
        })
      } else {
        console.error('unknown module type: ', moduleType)
      }
    }
  })

  // initialize all input last pulses of conjunctions
  modules
    .filter((module) => module.type === ModuleType.Conjunction)
    .forEach((conjModule) => {
      const inputs = modules.filter((module) => module.destinationNames.includes(conjModule.name))
      inputs.forEach((input) => {
        conjModule.lastPulses?.push({
          originName: input.name,
          destinationName: conjModule.name,
          highOrLow: false,
        })
      })
    })

  let highPulseCounts = 0
  let lowPulseCounts = 0
  let buttonPresses = 1 // we did one button press already as initialization
  let answerQuestion1

  // for the signal to rx to be low, all inputs of the input to rx must be high, so track them

  const rxSourceModule = modules.find((module) => module.destinationNames.includes('rx'))

  const requiredHighSources: { name: string; buttonPresses: number | undefined }[] | undefined =
    rxSourceModule?.lastPulses?.map((pulse) => {
      return {
        name: pulse.originName,
        buttonPresses: undefined,
      }
    })

  // simulate
  while (pulseStack.length > 0) {
    const currentPulse = pulseStack.shift()

    if (!currentPulse) {
      console.error('empty pulse stack')
      break
    }

    // count pulses
    if (currentPulse.highOrLow) {
      highPulseCounts++
    } else {
      lowPulseCounts++
    }

    // if (!currentPulse.highOrLow && currentPulse.destinationName === 'rx') { // this would take forever
    //   rxButtonPresses = buttonPresses
    //   break
    // }

    // it about the rhythm of the inputs to 'rx'
    // how many button presses until sj => kz is high? and the other three? the least common mult of that is out answer
    requiredHighSources?.forEach((reqSource) => {
      if (
        !reqSource.buttonPresses &&
        currentPulse.originName === reqSource.name &&
        currentPulse.highOrLow
      ) {
        reqSource.buttonPresses = buttonPresses
        // console.log(`${reqSource.name}: ${buttonPresses}`)
      }
    })

    // if we've set all targets leading up to rx
    if (requiredHighSources?.every((reqSource) => reqSource.buttonPresses)) {
      break
    }

    // process pulse
    const destinationModule = modules.find(
      (module) => module.name === currentPulse?.destinationName
    )

    if (destinationModule) {
      if (destinationModule.type === ModuleType.Broadcast) {
        destinationModule.destinationNames.forEach((dest) => {
          pulseStack.push({
            originName: destinationModule.name,
            destinationName: dest,
            highOrLow: currentPulse?.highOrLow,
          })
        })
      } else if (destinationModule.type === ModuleType.FlipFlop) {
        if (!currentPulse.highOrLow) {
          destinationModule.destinationNames.forEach((dest) => {
            pulseStack.push({
              originName: destinationModule.name,
              destinationName: dest,
              highOrLow: !destinationModule.onOrOff,
            })
          })
          destinationModule.onOrOff = !destinationModule.onOrOff
        }
      } else if (destinationModule.type === ModuleType.Conjunction) {
        const lastPulseFromSource = destinationModule.lastPulses?.find(
          (pulse) => pulse.originName === currentPulse.originName
        )
        lastPulseFromSource!.highOrLow = currentPulse.highOrLow

        if (destinationModule.lastPulses?.every((pulse) => pulse.highOrLow)) {
          destinationModule.destinationNames.forEach((dest) => {
            pulseStack.push({
              originName: destinationModule.name,
              destinationName: dest,
              highOrLow: false,
            })
          })
        } else {
          destinationModule.destinationNames.forEach((dest) => {
            pulseStack.push({
              originName: destinationModule.name,
              destinationName: dest,
              highOrLow: true,
            })
          })
        }
      } else {
        console.error('unknown module type of origin pulse')
      }
    }

    // if the call stack is empty, we press the button
    if (pulseStack.length === 0) {
      if (buttonPresses === 1000) {
        answerQuestion1 = lowPulseCounts * highPulseCounts
      }
      pulseStack.push({ originName: 'button', destinationName: 'broadcaster', highOrLow: false })
      buttonPresses++
      if (buttonPresses > 10000) {
        break // for testing question 1 on demo data
      }
    }
  }

  return {
    answerQuestion1: answerQuestion1 as number,
    answerQuestion2: requiredHighSources?.reduce(
      (prevVal, curVal) => prevVal * curVal.buttonPresses!,
      1
    ) as number,
  }
}
