import { Request, Response } from "express";

// the date represented in GMT time, not GMT+7
const handleDateAPI = (req: Request, res: Response) => {
  // unix time uses millisecond when parsed to Date obj
  // atleast 5 or more number is a valid unix time (atleast for now)
  const checkUnixTime: RegExp = /\d{5,}/g;
  const checkValidDate: RegExp =
    /(\d{4})\-(0[1-9]|1[1-2])\-(0[1-9]|[12]\d|3[01])/g;

  // when not provided and unixtime params not defined
  if (!req.params.hasOwnProperty("unixtime")) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
    });
  }

  // when provided with unixtime params on url
  const { unixtime } = req.params;

  if (checkUnixTime.test(unixtime)) {
    const unix = parseInt(unixtime);

    return res.json({
      unix: unix,
      utc: new Date(unix).toUTCString(),
    });
  }

  // last, when unixtime is actually a date string (such as yyyy, or else)
  const dateProvided: Date = new Date(unixtime);

  if (dateProvided.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: dateProvided.getTime(),
      utc: dateProvided.toUTCString(),
    });
  }
};

export { handleDateAPI };
