import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./datasource";
import mainRoutes from "./routers/main.routes";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1501;
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  }),
);
app.use("/", mainRoutes);
AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected:");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  return console.log(
    `Express server is listening at http://localhost:${PORT} 🚀`,
  );
});
