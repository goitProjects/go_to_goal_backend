require("dotenv").config();
const express = require("express");
const config = require("./config/config");
// const path = require("path");
// const next = require("next");
// const chalk = require("chalk");

require("./server/lib/cron");

const createServer = require("./server/server");
const connectToDB = require("./config/mongodb");

const PORT = config.PORT;
const DATABASE_URL = config.mongoURL;
// const isdev = process.env.NODE_ENV !== "production";

// const nextjs = next({ isdev });
// const handle = nextjs.getRequestHandler();

const app = express();

<<<<<<< HEAD
createServer(app, PORT);
connectToDB(DATABASE_URL);

=======
nextjs
  .prepare()
  .then(async () => {
    await createServer(app, PORT);
    await connectToDB(DATABASE_URL);
    if (isdev) {
      console.log(chalk.blue("############"));
      console.log(chalk.green("Everything is OK"));
      console.log(chalk.blue("############"));
    }
  })
  .then(() => {
    app
      .get("/auth", (req, res) => {
        return nextjs.render(req, res, "auth");
      })
      .get("/admin", (req, res) => {
        return nextjs.render(req, res, "admin");
      })
      .get("/restore/:token", (req, res) => {
        return nextjs.render(req, res, "restore");
      })
      .all("*", (req, res) => {
        return handle(req, res, "notfound");
      });
  })
  .catch(err => {
    console.error(chalk.red(err));
    throw new Error(err);
  });
>>>>>>> 93a1c6b004d76470358bfd9c9ab12ad151baaa78
