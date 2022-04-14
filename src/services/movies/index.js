// import { fs } from "fs-extra"
// import createError from "http-errors"
// import multer from "multer"
import uniqid from "uniqid"
import express from "express"
import { readMovies, writeMovies, readMoviesReviews, writeMoviesReviews } from "../../lib/fs-tools.js"

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
  try {
    const moviesArray = await readMovies()
    if (moviesArray) {
      const moviesReviewsArray = await readMoviesReviews()

      const fullArray = moviesArray.concat(moviesReviewsArray)

      res.status(200).send(fullArray)
    } else {
      console.log("no movies, br0")
    }
  } catch (error) {
    next(error)
  }
})

///////GET Media (single) (with reviews
moviesRouter.get("/media/:imdbID", async (req, res, next) => {
  try {
    const moviesArray = await readMovies()
    const moviesReviewsArray = await readMoviesReviews()

    const foundedID = moviesArray.find((movie) => movie.imdbID === req.params.imdbID)
    const foundedReviewID = moviesReviewsArray.find((movie) => movie.imdbID === req.params.imdbID)

    const fullArray = { foundedID, review: foundedReviewID }

    res.status(200).send(fullArray)
  } catch (error) {
    next(error)
  }
})
//////////UPDATE Media
moviesRouter.put("/media/:imdbID", async (req, res, next) => {
  try {
    const moviesArray = await readMovies()

    const foundedMovie = moviesArray.find((movie) => movie.imdbID === req.params.imdbID)
    const newMovieArray = { ...foundedMovie, ...req.body, updatedAt: new Date() }

    // select the foundedmovie ,merge to movies-(writeMovies)
    await writeMovies()

    res.status(200).send(newMovieArray)
  } catch (error) {
    next(error)
  }
})

////////DELETE Media
moviesRouter.delete("/media/:imdbID", async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
})
/////////
export default moviesRouter
