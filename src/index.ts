// const express = require('express')  // -> CommonJS
import express from "express"; // -> ES Module
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json"; // Adjust the path as necessary
import { Api } from "./models/Api"; // Adjust the path as necessary
import path from "path";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import workoutRoutes from "./routes/workout.routes";
import pointRoutes from "./routes/point.routes";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 라우트 연결
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes); // Use the new workout routes
app.use("/api/points", pointRoutes);

// 서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log("**----------------------------------**");
  console.log("====      Server is On...!!!      ====");
  console.log("**----------------------------------**");
});

// 기본 라우트
app.get("/", (req, res) => {
  res.send("만수무강 api is running");
});
