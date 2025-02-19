//multer-s3.d.ts

declare module "multer-s3" {
    import { Request } from "express";
    import multer from "multer";
    import { S3 } from "aws-sdk";
  
    function multerS3(options: multerS3.Options): multer.StorageEngine;
  
    namespace multerS3 {
      interface Options {
        s3: S3;
        bucket: string;
        acl?: string;
        key?: (req: Request, file: Express.Multer.File, cb: (error: any, key?: string) => void) => void;
      }
    }
  
    export = multerS3;
  }
  