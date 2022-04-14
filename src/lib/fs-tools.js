import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), ".../data")
const moviesJSONPath = join(dataFolderPath, "movies.json")

export const readMovies = () => readJSON(moviesJSONPath)
export const writeMovies = (content) => writeJSON(moviesJSONPath, content)
