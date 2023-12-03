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
year="2023"

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
  const stringArray = input.split('\\n')

  stringArray.pop()

  const answerQuestion1 = 10
  const answerQuestion2 = 20

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

      const fileNameQ1: string = 'inputQ1.txt'
      const filePathQ1: string = path.join(__dirname, fileNameQ1)
      inputQ1 = await readFileAsync(filePathQ1, 'utf8')

      // const fileNameQ2: string = 'inputQ2.txt'
      // const filePathQ2: string = path.join(__dirname, fileNameQ2)
      // inputQ2 = await readFileAsync(filePathQ2, 'utf8')
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

# Create inputQ1.txt and inputQ2.txt
touch $input_q1_file
touch $input_q2_file

echo "Day $day_number ($year) files created successfully at $project_structure"
