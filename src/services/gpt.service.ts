// gpt.service.ts
// chatgpt api 요청 서비스

//axios 방식
//import axios from "axios";
//const OPENAI_API_URL = "https://api.openai.com/v1/completions";
//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
/** 
export const gptService = {
  //✅ ChatGPT API를 이용해 운동 관련 질문 생성 
  generateQuestions: async (bmiCategory: string, healthIssues: string[]): Promise<string[]> => {
    try {
      const prompt = `사용자의 비만도는 ${bmiCategory}이고, 건강 문제로 ${healthIssues.join(", ")}가 있습니다. 
      운동 난이도를 결정하기 위해 적절한 질문을 5개 생성해 주세요. 질문은 리스트 형식으로 제공해 주세요.`;

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-4",
          prompt,
          max_tokens: 200,
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error("GPT 응답이 비어 있습니다.");
      }

      return response.data.choices[0].text
        .trim()
        .split("\n")
        .filter((q: string) => q.trim().length > 0);
    } catch (error) {
      console.error("GPT 질문 생성 오류:", error);
      throw new Error("ChatGPT API 요청 실패");
    }
  },

  // ✅ 운동 난이도를 결정하는 메서드
  determineFitnessLevel: async (responses: string[]): Promise<string> => {
    try {
      const prompt = `다음은 사용자의 건강 관련 답변입니다: ${responses.join(", ")}.
      이 답변을 기반으로 사용자의 운동 난이도를 초급, 중급, 고급 중 하나로 결정해 주세요.`;

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-4",
          prompt,
          max_tokens: 50,
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error("GPT 응답이 비어 있습니다.");
      }

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("GPT 운동 난이도 결정 오류:", error);
      throw new Error("ChatGPT API 요청 실패");
    }
  }
};
*/

//openai 방식
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const gptService = {
  /**
   * ✅ 운동 관련 질문 생성 (각 질문마다 개별 음성 답변을 받을 수 있도록 리스트 반환)
   */
  generateQuestions: async (bmiCategory: string, healthIssues: string[]): Promise<string[]> => {
    const prompt = `사용자의 비만도는 ${bmiCategory}이고, 건강 문제로 ${healthIssues.join(", ")}가 있습니다. 
    운동 난이도를 결정하기 위해 적절한 질문을 5개 생성해 주세요. 질문은 리스트 형식으로 제공해 주세요.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    
    console.log("🔹 GPT 응답:", response);

    const content = response.choices[0]?.message?.content || "";
    return content.split("\n").filter(q => q.trim().length > 0);
  },

  /**
   * ✅ 한 질문에 대한 사용자의 음성 답변을 텍스트로 변환 (Whisper API 사용)
   */
  transcribeAudio: async (filePath: string): Promise<string> => {
    const file = fs.createReadStream(filePath);

    const response = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "ko",
    });

    if (!response.text) throw new Error("음성 변환 실패");

    return response.text;
  },

  /**
   * ✅ 변환된 텍스트 응답들을 기반으로 운동 난이도 결정
   */
  determineFitnessLevel: async (responses: string[]): Promise<string> => {
    const prompt = `다음은 사용자의 건강 관련 답변입니다: ${responses.join(", ")}.
    이 답변을 기반으로 사용자의 운동 난이도를 초급(하), 초급(상), 중급, 고급 중 하나로 결정해 주세요.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content?.trim() || "운동 난이도를 결정할 수 없습니다.";
  },
};
