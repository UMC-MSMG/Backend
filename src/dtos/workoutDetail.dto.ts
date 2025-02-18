export class WorkoutDetailDto {
    id: number;
    step: number;
    description: string;
    link?: string; // AWS S3 비디오 링크
  
    constructor(id: number, step: number, description: string, link?: string) {
      this.id = id;
      this.step = step;
      this.description = description;
      this.link = link;
    }
  }
  