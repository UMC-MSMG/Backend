//gpt.controller.ts
//비만도 평가, 운동 관련 질문 생성, 운동 난이도 결정 

import { Request, Response } from "express";
import { MulterRequest } from "../types/multer.types";
import { gptService } from "../services/gpt.service";
import { calculateBMI } from "../utils/bmi.utils";

export const gptController = {
  /**
   * ✅ BMI 계산 + 비만도 평가 + 운동 관련 질문 생성
   */
  generateExerciseQuestions: async (req: Request, res: Response): Promise<void> => {
    try {
      const { height, weight, medications } = req.body;

      if (!height || !weight) {
        res.status(400).json({ message: "키와 몸무게는 필수 입력값입니다." });
        return;
      }

      // ✅ BMI 계산 및 비만도 평가
      const { bmi, category } = calculateBMI(height, weight);

      // ✅ GPT 질문 생성
      const questions = await gptService.generateQuestions(category, Array.isArray(medications) ? medications : []);

      res.status(200).json({ bmi, category, questions });
    } catch (error) {
      console.error("질문 생성 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  //axios 방식
  // 운동 난이도 결정
  /*
  determineFitnessLevel: async (req: Request, res: Response): Promise<void> => {
    try {
      const { responses } = req.body;
      if (!responses || !Array.isArray(responses)) {
        res.status(400).json({ message: "응답 목록이 필요합니다." });
        return;
      }

      // ✅ GPT를 활용하여 운동 난이도 분석
      const fitnessLevel = await gptService.determineFitnessLevel(responses);
      
      res.status(200).json({ fitnessLevel });
    } catch (error) {
      console.error("운동 난이도 결정 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },
  */

  //openai 방식
  /**
   * ✅ 음성 파일 변환 (Whisper API)
   */
  transcribeAudio: async (req: MulterRequest, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "음성 파일이 필요합니다." });
        return;
      }

      const text = await gptService.transcribeAudio(req.file.path);
      res.status(200).json({ text });
    } catch (error) {
      console.error("음성 변환 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  /**
   * ✅ 최종 운동 난이도 결정
   */
  determineFitnessLevel: async (req: Request, res: Response): Promise<void> => {
    try {
      const { responses } = req.body;
      if (!responses || !Array.isArray(responses)) {
        res.status(400).json({ message: "응답 목록이 필요합니다." });
        return;
      }

      const fitnessLevel = await gptService.determineFitnessLevel(responses);
      res.status(200).json({ fitnessLevel });
    } catch (error) {
      console.error("운동 난이도 결정 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },

};
