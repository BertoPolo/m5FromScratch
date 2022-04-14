import express from "express"
import { badRequestErr, unauthorizedErr, forbiddenErr, notFoundErr, genericErr } from "./errorsHandler.js" //NEED TO APPLY THEM!!
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
server.use(badRequestErr)
server.use(unauthorizedErr)
server.use(notFoundErr)
server.use(genericErr)
server.on("error", (err) => {
  console.log(err)
})

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log("server is running on port nº : ", port)
})
//
