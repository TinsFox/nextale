import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FileService {
  uploadFile(file: Express.Multer.File, request: Request) {
    if (!file) {
      return {
        code: 400,
        message: 'No file upload, file is required!',
      };
    }

    const baseUrl = this.getBaseUrl(request);
    const fileUrl = `${baseUrl}/assets/${file.filename}`;
    console.log('fileUrl: ', fileUrl);

    return {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      fileUrl,
    };
  }

  private getBaseUrl(head: Request): string {
    const protocol = head.protocol;
    const host = head.get('host');
    return `${protocol}://${host}`;
  }
}
