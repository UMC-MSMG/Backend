export interface MedicationDto {
  medName?: string;
  description?: string;
  medicationDays: string[]; // ["월", "화", "목"]
  medicationTimes: string[]; // ["08:00", "20:00"]
}

export interface SignupInfoDto {
  name: string;
  phone_number: string;
  gender: "MALE" | "FEMALE";
  birth_date: string;
  height: number;
  weight: number;
  agree_to_terms: boolean;
  medications: MedicationDto[];
}
