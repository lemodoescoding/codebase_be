import { handleDateAPI } from "../controllers/dateController";
import express, { Request, Response } from "express";

const apiRouter = express.Router();

// example based on the fcc-BE project timestamp. original done by me. view on github
apiRouter.get("/", handleDateAPI);

apiRouter.get("/:unixtime", handleDateAPI);

export { apiRouter };
