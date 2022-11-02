import { GameData, GameDataBrief } from "@/utils/intefaces"
import { FiltersState } from "@/store/filtersSlice"
import { connectDB, gamesModel } from "@/server/database"

export const getGameData = async (): Promise<GameData[]> => {
  await connectDB()
  return await gamesModel.find({}).lean()
}

const briefSelect = "_id key title cover ratingCritics ratingAge"

export const getGameDataById = async (id: string): Promise<GameData> => {
  await connectDB()
  return await gamesModel.findById(id).lean()
}

export const getGameDataBrief = async (ids: string[] = []): Promise<GameDataBrief[]> => {
  await connectDB()
  const filter = ids.length ? { _id: { $in: ids } } : {}
  return await gamesModel.find(filter).select(briefSelect).lean()
}

type FilterProps = Partial<FiltersState>
export const getFilteredGamesData = async ({
  title,
  ratingUsers,
  ratingCritics,
  releaseDate,
  sort,
}: FilterProps): Promise<GameDataBrief[]> => {
  await connectDB()
  let filter: any = {}
  if (title) filter.title = { $regex: title, $options: "i" }
  if (ratingUsers) filter.ratingUsers = { $gte: ratingUsers }
  if (ratingCritics) filter.ratingCritics = { $gte: ratingCritics }
  if (releaseDate) filter.releaseDate = { $gte: releaseDate }

  return await gamesModel
    .find(filter, null, sort ? { sort: { ratingCritics: "asc" } } : null)
    .select(briefSelect)
    .lean()
}

export const getGamesByKeys = async (keys: string[] = []): Promise<GameDataBrief[]> => {
  await connectDB()
  const filter = keys.length ? { key: { $in: keys } } : {}
  return await gamesModel.find(filter).select(briefSelect).lean()
}

export const addGame = async (game: Pick<GameData, "_id">) => {
  await connectDB()
  const newGame = new gamesModel(game)
  newGame.save()
}

export const updateGame = async (id: string, game: Partial<GameData>) => {
  await connectDB()
  gamesModel.findByIdAndUpdate(id, game)
}

export const deleteGame = async (id: string) => {
  await connectDB()
  gamesModel.findByIdAndDelete(id)
}
