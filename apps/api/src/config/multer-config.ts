import { extname, join } from 'path';
import { diskStorage } from 'multer';

export const FILE_SIZE_LIMIT = 1024 * 1024 * 5;
export const FILE_TYPE_LIMIT = ['jpg', 'jpeg', 'png', 'gif'];
export const UPLOAD_DIR = join(process.cwd(), 'uploads');

export const multerConfig = {
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: any) => {
    console.log('multerConfig', file);
    if (FILE_TYPE_LIMIT.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Invalid file type'), false);
  },
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      const suffix = extname(file.originalname);
      return cb(null, `${randomName}${suffix}`);
    },
  }),
};
