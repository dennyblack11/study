import express, { Application, json } from "express";
import { dbConfig } from "./utils/dbConfig";
import cors from "cors";
import { mainApp } from "./mainApp";

const app: Application = express();
const port: number = 4000;

app.use(json());
app.use(cors());

mainApp(app);

const server = app.listen(port, () => {
  console.clear();
  dbConfig();
});

process
  .on("uncaughtException", (err: Error) => {
    console.log(err);
    process.exit(1);
  })
  .on("unhandledRejection", (reason: any) => {
    console.log(reason);
    server.close(() => {
      process.exit(1);
    });
  });
