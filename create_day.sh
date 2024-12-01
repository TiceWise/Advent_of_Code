#!/bin/bash

# Save this script as create_day.sh and make it executable using the command chmod +x create_day.sh.
# Then you can run it with the day number as an argument: $./create_day.sh 1

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <day_number>"
    exit 1
fi

# Extract the day number from the command line arguments
day_number=$1
year="2024"

# Define the project structure
project_structure="src/$year/day$day_number"
day_file="$project_structure/day$day_number.ts"
spec_file="$project_structure/day$day_number.spec.ts"
input_q1_file="$project_structure/inputQ1.txt"
input_q2_file="$project_structure/inputQ2.txt"

# Create the project structure
mkdir -p $project_structure

# Create TypeScript files from templates
cat <<EOF >$day_file
import { Answer } from '../../models/models'

export function AoC${year}Day${day_number}(input: string): Answer {
  // remove last '\n'
  input = input.endsWith('\n') ? input.slice(0, -1) : input

  const stringArray = input.split('\n')

  const [p1, p2] = stringArray[0].split(' ').map(Number)

  const answerQuestion1 = p1
  const answerQuestion2 = p2

  return { answerQuestion1, answerQuestion2 }
}
EOF

cat <<EOF >$spec_file
import { AoC${year}Day${day_number} } from './day$day_number'
import path from 'path'
import fs from 'fs'

describe('AoC $year day $day_number', () => {
  let inputQ1: string
  let inputQ2: string

  beforeAll(async () => {
    try {
      const readFileAsync = fs.promises.readFile

      inputQ1 = await readFileAsync(path.join(__dirname, 'inputQ1.txt'), 'utf8')

      // inputQ2 = await readFileAsync(path.join(__dirname, 'inputQ2.txt'), 'utf8')

      inputQ2 = inputQ1
    } catch (err) {
      console.error('Error reading the file:', err)
    }
  })

  it('should correctly answer question 1', () => {
    expect(AoC${year}Day${day_number}(inputQ1).answerQuestion1).toBe(10)
  })

  it('should correctly answer question 2', () => {
    expect(AoC${year}Day${day_number}(inputQ2).answerQuestion2).toBe(20)
  })
})
EOF

# Create inputQ1.txt and inputQ1b.txt
cat <<EOF >$input_q1_file
10 20
EOF

touch $input_q2_file

git add $project_structure

echo "Day $day_number ($year) files created successfully at $project_structure"
