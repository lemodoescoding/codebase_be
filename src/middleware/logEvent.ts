import { Request, Response } from "express";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import fs from "fs";
import path from "path";
const fsPromise = fs.promises;
// logger custom function

const logEvents = async function (
  message: string,
  filename: string,
): Promise<void> {
  // provide date format as yyyyMMdd HH:mm:ss using date-fns
  const date: string = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  // template for log to be append on the log file
  const logItem: string = `${date}\t${uuid()}\t${message}`;

  try {
    // check if logs directory is exists
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // if not then create the directory
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }

    // append the message onto the end of the file and place it on new line
    // also appendFile method creates the file automatically if one doesn't exist
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", filename),
      logItem,
    );
  } catch (err) {
    // if there is an error, it will emit the error here
    console.error(err);
  }
};

const reqLogger = function (req: Request, _: Response, next: Function): void {
  logEvents(
    `${req.method}\t${req?.headers?.origin}\t${req.url}\n`,
    "reqLogs.txt",
  );
  // move to the next
  next();
};

export { logEvents, reqLogger };
