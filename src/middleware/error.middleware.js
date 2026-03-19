export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[Error] ${req.method} ${req.url} - ${statusCode}: ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};
