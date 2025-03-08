import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}
  uploadFile(file: Express.Multer.File, request: Request) {
    if (!file) {
      return {
        code: 400,
        message: 'No file upload, file is required!',
      };
    }

    const baseUrl = this.getBaseUrl(request);
    const fileUrl = `${baseUrl}/assets/${file.filename}`;

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
  async getPresignedUrl(fileName: string, contentType: string) {
    if (!fileName || !contentType) {
      return {
        code: 400,
        message: 'No file name or content type!',
      };
    }
    const s3Config = {
      endpoint: this.configService.get('S3_ENDPOINT'),
      accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
      bucket: this.configService.get('S3_BUCKET'),
      publicDomain: this.configService.get('S3_PUBLIC_DOMAIN'),
    };

    if (
      !s3Config.endpoint ||
      !s3Config.accessKeyId ||
      !s3Config.secretAccessKey ||
      !s3Config.bucket
    ) {
      return {
        code: 400,
        message: 'S3 config is not set!',
      };
    }
    const client = new S3Client({
      region: 'auto',
      endpoint: s3Config.endpoint,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
    });

    const command = new PutObjectCommand({
      Bucket: s3Config.bucket,
      Key: fileName,
      ContentType: contentType,
      ACL: 'public-read',
    });

    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });
    let publicUrl: string;
    if (s3Config.publicDomain) {
      const domain = s3Config.publicDomain.replace(/\/+$/, '');
      publicUrl = `${domain}/${fileName}`;
    } else {
      const endpoint = s3Config.endpoint;
      publicUrl = `${endpoint}/${s3Config.bucket}/${fileName}`;
    }
    return {
      presignedUrl,
      publicUrl,
    };
  }
}
