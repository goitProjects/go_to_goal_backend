require("dotenv").config();
require("./core/express-promise");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const chalk = require("chalk");

// doc
const cors = require("cors");
// const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./services/swagger.json");

// core
const { ValidationError } = require("./core/error");
const onError = require("./core/onError");

// middleware
// const validationErrorHandler = require("./middleware/validation-error-handler");
const errorHandler = require("./middleware/error-handler");
// const notFound = require("./middleware/not-found");

const router = require("./routes/routes.js");
// const ssrRoutes = require("./routes/ssrRoutes.js");

const isdev = process.env.NODE_ENV !== "production";

// if (isdev) {
//   console.log(chalk.blue("########"));
//   console.log(chalk.yellow("Hey cowboy, not so fast :)"));
//   console.log(
//     `${chalk.yellow("First you must type")} ${chalk.blue("npm run build")}`
//   );
//   console.log(chalk.yellow("Without this it wouldnt work"));

//   console.log(`${chalk.yellow("Then type")} ${chalk.blue("npm run dev")}`);
//   console.log(chalk.blue("########"));
// }

const createServer = (app, PORT) => {
  if (isdev) {
    app.use(logger("dev"));
  }

  app
    .disable("x-powered-by")
    .use(express.json({ limit: "2mb" }))
    .use(express.urlencoded({ extended: false, limit: "2mb" }))
    .use(
      session({
        secret: "super-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
      })
    )
    .use(cors("*"))
    .use(passport.initialize())
    .use(passport.session());
  require("./services/passport")(passport);

  app
    .use("/", express.static(path.join(__dirname, "../static")))
    .get("/dashboard", express.static(path.join(__dirname, "../static")))
    .get("/contacts", express.static(path.join(__dirname, "../static")))
    .use("/_next", express.static(path.resolve(__dirname, "../.next")))
    .use("/public", express.static(path.join(__dirname, "../public")))
    .use("/api", router)
    .use(
      "/doc",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, { customSiteTitle: "GoToGoal" })
    )

    // add error handlers
    .use((err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(400).json({ status: "error", message: err.message });
      }
      return next(err);
    })
    // .use(validationErrorHandler)
    .use(errorHandler)

    .listen(PORT, () => {
      if (isdev) {
        console.error(
          `Server start on ${chalk.yellow(`http://localhost:${PORT}`)}`
        );
      }
    })
    .on("error", onError);
};

module.exports = createServer;
