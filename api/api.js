const express = require("express");
const apiRouter = express.Router();

const incidentRouter = require("./incidents");
apiRouter.use("/incidents", incidentRouter);

module.exports = apiRouter;
