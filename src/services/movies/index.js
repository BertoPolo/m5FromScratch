// import { fs } from "fs-extra"
// import createError from "http-errors"
// import multer from "multer"
import uniqid from "uniqid"
import express from "express"
import { readMovies, writeMovies, readMoviesReviews, writeMoviesReviews } from "../../lib/fs-tools.js"
import { join } from "path"

const moviesRouter = express.Router()

/////POST a movie
//schema remaining
//bugged but working
moviesRouter.post("/media", async (req, res, next) => {
  try {
    const moviesArray = await readMovies()

    const newMovie = { ...req.body, imdbID: uniqid() }

    moviesArray.push(newMovie)

    await writeMovies(moviesArray)

    res.status(201).send({ id: newMovie.imdbID })
  } catch (error) {
    next(error)
  }
})

///// GET Media (list) (reviews included)
moviesRouter.get("/media", async (req, res, next) => {
  const moviesArray = await readMovies()
  if (moviesArray) {
    const moviesReviewsArray = await readMoviesReviews()

    const fullArray = moviesArray.concat(moviesReviewsArray)

    res.status(200).send(fullArray)
  } else {
    console.log("no movies, br0")
  }
})

///////GET Media (single) (with reviews
moviesRouter.get("/media/:imdbID", async (req, res, next) => {
  const moviesArray = await readMovies()
  const moviesReviewsArray = await readMoviesReviews()

  const foundedID = moviesArray.find((element) => element.imdbID === "tt0120737")
  const foundedReviewID = moviesReviewsArray.find((element) => element.imdbID === "tt0120737")

  const fullArray = { foundedID, review: foundedReviewID }

  res.status(200).send(fullArray)
})

////////
export default moviesRouter
