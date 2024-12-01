import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export async function getAoCInputData(day: number, year: number): Promise<string> {
  const inputCallResult = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Cookie: process.env.SESSION_COOKIE,
    },
  })
  return inputCallResult.data
}
