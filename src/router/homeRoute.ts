import express, { Request, Response } from "express";

const homeRouter = express.Router();

homeRouter.get("^/$|index(.html)?", (_: Request, res: Response) => {
  // auto redirect when accessing / using GET method
  return res.redirect("/date");
});

export { homeRouter };
