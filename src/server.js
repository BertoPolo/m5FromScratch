import express from "express"

const server = express()

const port = process.env.PORT || 3003

const moviesRouter = express.Router()

server.use("/movies", moviesRouter)
server.use(express.json())

server.listen(port, () => {
  console.log("server is running on port nº : ", port)
})
