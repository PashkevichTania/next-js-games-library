// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getFilteredGamesData, getGameData, getGameDataBrief, getGamesByKeys } from "src/server/databaseQuery"
import { gamesModel, connectDB } from "src/server/database"
import { getJSON } from "src/server/apiUtils"


const gamesToPreview = [
  "i960g6", //"The Last of Us Part I"
  "a884nl", //"The Last of Us Part II"
  "r63vpd", //"Disco Elysium: The Final Cut"
  "8swucl", //"BioShock Infinite"
  "kn15c7", //"Fortnite"
  "45ec0g", //"Cyberpunk 2077"
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let result = {}
    switch (req.method) {
      case "GET":
        // connectDB().catch(error => console.error(error))
        // const data = await getJSON()
        //
        // data.games.forEach(g => {
        //   const c = new gamesModel(g)
        //   c.save()
        // })
        result = await getFilteredGamesData({title: "the"})
        res.status(200).json(result)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} is not supported`)
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load data", detail: JSON.stringify(err) })
  }
}