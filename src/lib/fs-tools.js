import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"

const { readJSON, writeJSON } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const moviesJSONPath = join(dataFolderPath, "movies.json")
const moviesReviewsJSONPath = join(dataFolderPath, "moviesReviews.json")

export const readMovies = () => readJSON(moviesJSONPath)
export const writeMovies = (content) => writeJSON(moviesJSONPath, content)
export const readMoviesReviews = () => readJSON(moviesJSONPath)
export const writeMoviesReviews = (content) => writeJSON(moviesReviewsJSONPath, content)
