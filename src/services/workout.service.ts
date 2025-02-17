// import * as workoutRepository from "../repositories/workout.repository";
// import { WorkoutDetail } from "../types/workout.types";

// export const getWorkoutsByCategoryId = async (categoryId: bigint): Promise<WorkoutDetail[]> => {
//   const categories = await workoutRepository.getWorkoutsByCategoryId(categoryId);

//   return categories.map(workout => ({
//     id: Number(workout.id),
//     name: workout.workoutName || "",
//     videoLink: workout.videoLink,
//     description: workout.description,
//     videoName: workout.videoName,
//   }));
// };
