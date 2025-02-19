import { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

// AWS S3 설정
const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME as string,
    acl: "public-read",
    key: function (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) {
      cb(null, `profile_images/${Date.now()}_${file.originalname}`);
    },
  }),
});

export const uploadProfileImage = (req: Request, res: Response) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "파일 업로드 실패", statusCode: 500 });
    }
    if (!req.file) {
      return res.status(400).json({ error: "이미지를 선택하세요.", statusCode: 400 });
    }

    const fileUrl = (req.file as any).location; // 업로드된 파일 URL
    res.json({ imageUrl: fileUrl });
  });
};
