import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import mime from 'mime';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('region'),
      credentials: {
        accessKeyId: this.configService.get<string>('accessKeyId'),
        secretAccessKey: this.configService.get<string>('secretAccessKey'),
      },
    });
    this.bucketName = this.configService.get<string>('awsBucketName');
  }

  getExtensionFromContentType(mimeType: string) {
    return mime.extension(mimeType);
  }

  async generatePreSignedUrl(type: string) {
    const extension = this.getExtensionFromContentType(type);
    if (!extension) {
      throw new BadRequestException('Invalid file type');
    }
    const key = `${uuidV4()}.${extension}`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ACL: 'public-read',
      ContentType: type,
    });

    const preSignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 1800,
    });
    return { preSignedUrl, key };
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    await this.s3Client.send(command);
  }

  async downloadFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const response = await this.s3Client.send(command);
    return {
      buffer: response.Body,
      contentType: response.ContentType,
      key,
    };
  }
}
