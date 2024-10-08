import { Injectable } from '@nestjs/common';

import { UPLOAD_DIR } from '~/config/multer-config';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File) {
    if (!file) {
      return {
        code: 400,
        message: 'No file upload, file is required!',
      };
    }

    return {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      fileUrl: `${UPLOAD_DIR}/${file.filename}`,
    };
  }
}
