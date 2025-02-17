// gpt.types.ts
import { GPTQuestionResponse, GPTFitnessLevelResponse } from "../types/gpt.types";
import { GPTResponse } from "../types/response.types";

export interface GPTQuestionResponse {
    questions: string[];
  }
  
  export interface GPTFitnessLevelResponse {
    fitnessLevel: string;
  }
  