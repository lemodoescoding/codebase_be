import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// import corsOptions config
import { corsOptions } from "./config/corsOptions";
import { reqLogger } from "./middleware/logEvent";
import { homeRouter } from "./router/homeRoute";
import { apiRouter } from "./router/dateAPIRoute";

// loads the ENV file and load it to process.env
dotenv.config();
// import port number on the env if defined, otherwise use the 5500 port
const port = process.env.PORT || 5500;

const app = express();

app.use(cors(corsOptions));
// body-parser
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));

// log the upcoming request
app.use(reqLogger);

app.use("/", homeRouter);
app.use("/date", apiRouter);

// listen to port based on the ENV variable or using the default 5500 port
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
