//Not found
const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  return next(err);
};

//Err Handler
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler, notFound };
