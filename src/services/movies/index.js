// import { fs } from "fs-extra"
import multer from "multer"
import uniqid from "uniqid"
import createError from "http-errors"
import express from "express"
import { readMovies, writeMovies } from "../../lib/fs-tools.js"

const moviesRouter = express.Router()

/////POST a movie
//schema remaining
moviesRouter.post("/media", async (req, res, next) => {
  try {
    const moviesArray = await readMovies()

    const newMovie = { ...req.body, imdbID: uniqid }

    moviesArray.push(newMovie)

    await writeMovies(moviesArray)

    res.status(201).send("id : ", newMovie.imdbID)
  } catch (error) {
    next(error)
  }
})

/////

export default moviesRouter
