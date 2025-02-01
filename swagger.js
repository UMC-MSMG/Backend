import swaggerAutogenLib from "swagger-autogen";

const swaggerAutogen = swaggerAutogenLib({ openapi: "3.0.0" });

const options = {
  info: {
    title: "MSMG",
    description: "만수무강 스웨거.",
    version: "1.0.0",
  },
  tags: [
    {
      name: "Auth",
      description: "로그인, jwt 관련 API",
    },
    {
      name: "Users",
      description: "유저 관련 API",
    },
  ],
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      in: "header",
      bearerFormat: "JWT",
    },
  },
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/index.ts"];
swaggerAutogen(outputFile, endpointsFiles, options);
