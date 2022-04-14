export const badRequestErr = (err, req, res, next) => {
  if (err.status === 400) {
    res.stauts(400).send(err.message)
  } else {
    next(err)
  }
}

export const unauthorizedErr = (err, req, res, next) => {
  if (err.status === 401) {
    res.stauts(401).send(err.message)
  } else {
    next(err)
  }
}

export const forbiddenErr = (err, req, res, next) => {
  if (err.status === 403) {
    res.stauts(403).send(err.message)
  } else {
    next(err)
  }
}

export const notFoundErr = (err, req, res, next) => {
  if (err.status === 404) {
    res.stauts(404).send(err.message)
  } else {
    next(err)
  }
}

export const genericErr = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ message: "GENERIC Server Error" })
}
