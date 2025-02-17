// utils/bmiCalculator.ts
// BMI 계산 함수

export const calculateBMI = (height: number, weight: number): { bmi: number; category: string } => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category = "";

  if (bmi < 18.5) category = "저체중";
  else if (bmi < 25) category = "정상";
  else if (bmi < 30) category = "과체중";
  else category = "비만";

  return { bmi: parseFloat(bmi.toFixed(2)), category };
};

