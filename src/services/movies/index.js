// import { fs } from "fs-extra"
// import createError from "http-errors"
import multer from "multer"
import uniqid from "uniqid"
import express from "express"
import { readMovies, writeMovies, readMoviesReviews, writeMoviesReviews, savePosters } from "../../lib/fs-tools.js"

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

//////POST Poster to single media

moviesRouter.post("/media/:imdbID", multer().single("poster"), async (req, res, next) => {
  try {
    //the function in fs-tools to save img's in PUBLIC . remember to do PUBLIC's stuff
    savePosters(`${params.imdbID}.jpg`, req.file.buffer)
    res.status(201).send("poster posted")
  } catch (error) {
    next(error)
  }
})

//////////POST Review to media ( /media/:id/reviews)
moviesRouter.post("/media/:imdbID/reviews", async (req, res, next) => {
  try {
    let moviesReviewsArray = await readMoviesReviews()

    const id = uniqid()
    const elementId = req.params.imdbID
    const body = req.body

    const newReview = { ...moviesReviewsArray, body, id, elementId }

    moviesReviewsArray.push(newReview)

    writeMoviesReviews(moviesReviewsArray)

    res.status(201).send("review posted")
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

///////GET Media (single) (with reviews)
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

    const index = moviesArray.findIndex((movie) => movie.imdbID === req.params.imdbID)

    const newMovieArray = { ...moviesArray[index], ...req.body, updatedAt: new Date() }

    moviesArray[index] = newMovieArray

    await writeMovies(moviesArray)

    res.status(200).send(newMovieArray)
  } catch (error) {
    next(error)
  }
})

////////DELETE Media
moviesRouter.delete("/media/:imdbID", async (req, res, next) => {
  const moviesArray = await readMovies()

  const remainingMovies = moviesArray.filter((movie) => movie.imdbID !== req.params.imdbID)

  await writeMovies(remainingMovies)

  res.status(200).send("Deleted!")

  try {
  } catch (error) {
    next(error)
  }
})
/////////DELETE Review of media
moviesRouter.delete("/media/:imdbID/reviews", async (req, res, next) => {
  try {
    const reviews = await readMoviesReviews()

    const remainingReviews = reviews.filter((review) => review.elementId !== req.params.imdbID)

    writeMoviesReviews(remainingReviews)

    res.status(200).send("Deleted")
  } catch (error) {
    next(error)
  }
})
//////

export default moviesRouter
