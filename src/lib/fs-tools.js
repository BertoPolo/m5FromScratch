import { fileUrlToPath } from "url"
import { dirname, join } from "path"

const moviesJSONPath = join(dirname(fileUrlToPath(import.meta.url)), "movies.json")

const readMovies = JSON.parse(fs.readFile(moviesJSONPath).toString())

const writeMovies = fs.writeFile(moviesJSONPath, JSON.stringify())
