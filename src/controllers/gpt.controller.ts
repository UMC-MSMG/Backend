//gpt.controller.ts
//비만도 평가, 운동 관련 질문 생성, 운동 난이도 결정 

import { Request, Response } from "express";
import { gptService } from "../services/gpt.service";
import { userService } from "../services/user.service";
import { calculateBMI } from "../utils/bmiCalculator";

export const gptController = {
  /**
   * ✅ (JWT 없음) 회원가입 전에 BMI 계산 + 비만도 평가 + 운동 관련 질문 생성
   */
  generateExerciseQuestionsWithoutAuth: async (req: Request, res: Response) => {
    try {
      const { height, weight, medications } = req.body;

      if (!height || !weight) {
        return res.status(400).json({ message: "키와 몸무게는 필수 입력값입니다." });
      }

      // ✅ BMI 계산 및 비만도 평가
      const { bmi, category } = calculateBMI(height, weight);

      // ✅ GPT 질문 생성
      const questions = await gptService.generateQuestions(category, Array.isArray(medications) ? medications : []);

      return res.status(200).json({ bmi, category, questions });
    } catch (error) {
      console.error("BMI & 질문 생성 오류:", error);
      return res.status(500).json({ message: "서버 오류" });
    }
  },

  /**
   * ✅ (JWT 없음) 회원가입 전에 운동 난이도 결정
   */
  determineFitnessLevelWithoutAuth: async (req: Request, res: Response) => {
    try {
      const { responses } = req.body;
      if (!responses || !Array.isArray(responses)) {
        return res.status(400).json({ message: "응답 목록이 필요합니다." });
      }

      // ✅ GPT를 활용하여 운동 난이도 분석
      const fitnessLevel = await gptService.determineFitnessLevel(responses);
      
      return res.status(200).json({ fitnessLevel });
    } catch (error) {
      console.error("운동 난이도 결정 오류:", error);
      return res.status(500).json({ message: "서버 오류" });
    }
  },
};
