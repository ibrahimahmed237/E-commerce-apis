import {app} from "./socket/socket.js";
import express from "express"
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./modules/user/routes/user.route.js";
import authRoutes from "./modules/authentication/routes/auth.route.js";
import storeRoutes from "./modules/store/routes/store.route.js";
import adminRoutes from "./modules/admin/routes/admin.route.js";
import categoryRoutes from "./modules/category/routes/category.route.js";

config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.get("/", (req, res, next) => {
  res.send("Hello Form API");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/categories", categoryRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
