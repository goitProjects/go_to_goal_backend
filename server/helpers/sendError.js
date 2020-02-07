const sendError = (res, error) => {
  const errMessage = error.message || "must handle error message";
  res.json({
    status: "error",
    message: errMessage
  });
};

module.exports = sendError;
