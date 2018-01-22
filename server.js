const apiRouter = require("./api/api");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan(`dev`)); // logging
app.use(bodyParser.json()); // body parsing
app.use(cors()); // cross-origin resource sharing

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", apiRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port);

console.log(`Server listening on ${port}`);
