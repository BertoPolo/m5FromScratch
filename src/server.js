import express from "express"
import { badRequestErr, unauthorizedErr, forbiddenErr, notFoundErr, genericError } from "./errorsHandler.js" //NEED TO APPLY THEM!!
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import moviesRouter from "./services/movies/index.js"

const server = express()

const port = process.env.PORT || 3003

server.use(cors())
//
server.use(express.json())
//
server.use("/movies", moviesRouter)

server.listen(port, () => {
  console.table(listEndpoints)
  console.log("server is running on port nº : ", port)
})
