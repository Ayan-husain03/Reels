import express from "express";
import router from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import foodRouter from "./routes/food.routes.js";
import cors from "cors";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// * user routes
app.use("/api/v1/user", router);

// * food routes
app.use("/api/v1/food", foodRouter);

export default app;
