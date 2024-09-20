const corsOptions: object = {
  origin: "*",
  methods: ["GET", "POST"], // for temporary
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

export { corsOptions };
