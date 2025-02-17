// gpt.service.ts
// chatgpt api 요청 서비스

import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const gptService = {
  /** ChatGPT API를 이용해 운동 관련 질문 생성 */
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

      return response.data.choices[0].text.trim().split("\n").filter(q => q);
    } catch (error) {
      console.error("GPT 질문 생성 오류:", error);
      throw new Error("ChatGPT API 요청 실패");
    }
  },

  /** 사용자의 답변을 기반으로 운동 난이도를 결정 */
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
  },
};
