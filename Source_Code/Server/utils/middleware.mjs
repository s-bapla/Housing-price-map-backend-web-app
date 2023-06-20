// handles errors for application
const errorHandler = (error, _request, response, next) => {
  console.error("error handling middleware");
  response.status(500).send({ error: error.message });
};

export default { errorHandler };
