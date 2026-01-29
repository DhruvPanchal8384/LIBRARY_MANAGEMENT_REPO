import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../datasource";
import mainRoutes from "./routers/main.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 1501;
app.use(express.json());
app.use("/", mainRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected:");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`,
  );
});
