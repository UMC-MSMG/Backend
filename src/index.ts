// const express = require('express')  // -> CommonJS
//http://43.202.104.127/
import express from "express"; // -> ES Module
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import * as swaggerDocument from "../swagger.json"; // Adjust the path as necessary
import { Api } from "./models/Api"; // Adjust the path as necessary
import { prisma } from "./db.config";

//로그인 관련 라이브러리/함수 import
import passport from "passport";
import initializePassport from "./passport/config.passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";

//라우트 임포트
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import workoutRoutes from "./routes/workout.routes";
import pointRoutes from "./routes/points.routes";
import stepRoutes from "./routes/steps.routes";

const app = express();
const port = 3000;
dotenv.config();

// Middleware
app.use(express.json());
// app.use(cors()); // cors 방식 허용
// app.use(cors({ origin: "http://your-frontend-domain.com", credentials: true }));
app.use(express.static("public")); // 정적 파일 접근

// Swagger setup

//Swagger 문서에 Bearer Token 인증 추가
interface SwaggerDocument {
  components?: any;
  security?: any;
}
const swaggerDoc: SwaggerDocument = swaggerDocument;
swaggerDoc.components = {    
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};
swaggerDoc.security = [{ BearerAuth: [] }];

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//로그인 관련 passport, 함수, 라우팅
initializePassport();

app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "secret",
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 라우트 연결
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes); // Use the new workout routes
app.use("/api/points", pointRoutes);
app.use("/api/steps", stepRoutes);

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
