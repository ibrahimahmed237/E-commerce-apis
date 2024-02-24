import express from "express";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";

const app = express();

config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.get("/", (req, res, next) => {
  res.send("Hello Form API");
});

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
