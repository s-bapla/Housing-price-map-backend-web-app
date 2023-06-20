import express from "express";
import asyncHandler from "express-async-handler";
import cors from "cors";
import * as db from "./dbcon.mjs";
import middleware from "./utils/middleware.mjs";
import citiesRouter from "./controllers/cities-controller.mjs";
import statesRouter from "./controllers/states-controller.mjs";
import homesRouter from "./controllers/homes-controller.mjs";
import regionsRouter from "./controllers/regions-controller.mjs";
import zillowRouter from "./controllers/zillow-estimates-controller.mjs";
import regionStatisticsRouter from "./controllers/region-statistics-controller.mjs";

// Express

let app = express();
const PORT = 9178;

app.use(cors());


app.use(express.json());

app.use('/api/Cities', citiesRouter)
app.use('/api/States', statesRouter)
app.use('/api/Homes', homesRouter)
app.use('/api/Regions', regionsRouter)
app.use('/api/Zillow-Estimates', zillowRouter)
app.use('/api/Region-Statistics', regionStatisticsRouter)


app.get("/*", (req, res) => {
  res.send("hello; this is the REST API server");
});

app.use(middleware.errorHandler);

/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});
