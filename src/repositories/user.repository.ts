import { prisma } from "../db.config";
import { SignupInfoDto, MedicationDto } from "../dtos/user.dto";
import { Day } from "@prisma/client"; // Prisma Enum 불러오기

const dayMapping: Record<string, Day> = {
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THU: "THU",
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
};
export const UserRepository = {
  updateUserInfo: async (userId: number, userData: SignupInfoDto) =>
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name,
        phoneNumber: userData.phone_number,
        gender: userData.gender,
        birthDate: new Date(userData.birth_date),
        height: userData.height,
        weight: userData.weight,
        consentPrivacyPolicy: userData.agree_to_terms,
      },
    }),

  deleteUserMedications: async (userId: number) =>
    await prisma.medication.deleteMany({
      where: { userId },
    }),

  addMedications: async (userId: number, medications: MedicationDto[]) => {
    return await prisma.$transaction(
      medications.map((med) =>
        prisma.medication.create({
          data: {
            userId,
            medName: med.medName,
            description: med.description || "",
            MedicationDay: {
              create: med.medicationDays.map((day) => ({
                day: dayMapping[day] as Day, // 🔹 Prisma Enum으로 변환
              })),
            },
            MedicationTime: {
              create: med.medicationTimes.map((time) => ({
                time: new Date(`1970-01-01T${time}:00Z`),
              })),
            },
          },
        })
      )
    );
  },
};
