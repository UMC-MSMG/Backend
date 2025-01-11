// const express = require('express')  // -> CommonJS
import express from "express"; // -> ES Module
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json"; // Adjust the path as necessary
import { Api } from "./models/Api"; // Adjust the path as necessary

const app = express();
const port = 3000;

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//운동 횟수

//운동 유형

//운동 리스트 조회
app.get("/api/workouts/:categoryId", (req, res) => {
  const categoryId = parseInt(req.params.categoryId, 10);
  const workouts = [
    { exerciseId: 1, exerciseName: "스쿼트" },
    { exerciseId: 2, exerciseName: "윗몸일으키기" },
    { exerciseId: 3, exerciseName: "제자리뛰기" },
  ];
  res.json(workouts);
});

//운동 데이터 기록
app.post("/api/workouts/log/:userId", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { exerciseId, duration } = req.body;
  res.json({ message: "Workout logged successfully" });
});

//포인트 조회
app.get("/api/points/:userId", async (req, res) => {
  const userId = req.params.userId;
  const api = new Api();

  try {
    const response = await api.pointsDetail(userId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//포인트 적립
app.put("/api/points/:userId/add", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { missionId, points, title, context } = req.body;
  const totalPoints = 1000; // Example total points

  res.json({
    user_id: userId,
    points: points,
    totalPoints: totalPoints,
    missionId: missionId,
    message: "포인트가 성공적으로 적립되었습니다.",
  });
});

//포인트 차감
app.put("/api/points/:userId/user", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const { points, title, context } = req.body;
  const totalPoints = 500; // Example remaining points after deduction

  res.json({
    user_id: userId,
    points: points,
    totalPoints: totalPoints,
    message: "포인트가 성공적으로 사용 되었습니다.",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
