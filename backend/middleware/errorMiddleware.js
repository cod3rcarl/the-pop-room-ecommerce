const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode;
  res.status(statusCode);
  console.log(err);
  res.json({
    message: `My Custom Error ${err}`,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

module.exports = { notFound, errorHandler };
