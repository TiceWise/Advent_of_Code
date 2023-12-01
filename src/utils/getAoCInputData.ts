import axios from 'axios'
import { environment } from '../../environments/environment'

export async function getAoCInputData(day: number, year: number): Promise<string> {
  const inputCallResult = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      Cookie: environment.sessionCookie,
    },
  })
  return inputCallResult.data
}
