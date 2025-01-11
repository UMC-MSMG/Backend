// const express = require('express')  // -> CommonJS
import express from "express"; // -> ES Module
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json"; // Adjust the path as necessary
import { Api } from "./models/Api"; // Adjust the path as necessary

const app = express();
const port = 3000;

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
