import { Inject, Injectable } from '@nestjs/common';

import * as schema from '~/database/schema';
import { CloudFunction, NewCloudFunction } from '~/database/schema';

import { eq } from 'drizzle-orm';
import { DRIZZLE } from '../database/database.module';
import { DrizzleDB } from '../database/drizzle';

@Injectable()
export class CloudFunctionsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createCloudFunction(data: NewCloudFunction): Promise<CloudFunction> {
    const [cloudFunction] = await this.db
      .insert(schema.cloudFunctionsTable)
      .values(data)
      .returning();
    // TODO
    // 进入队列中 把 TypeScript 代码编译成 JavaScript 代码

    return cloudFunction;
  }

  async getCloudFunction(url: string): Promise<CloudFunction | null> {
    const [cloudFunction] = await this.db
      .select()
      .from(schema.cloudFunctionsTable)
      .where(eq(schema.cloudFunctionsTable.url, url));
    return cloudFunction || null;
  }

  async executeCloudFunction(
    url: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    const cloudFunction = await this.getCloudFunction(url);
    if (!cloudFunction) {
      throw new Error('Cloud function not found');
    }
    // 判断请求的 http method 是否在 cloudFunction.method 中
    if (!cloudFunction.method.includes(req.method)) {
      throw new Error('Cloud function method not allowed');
    }
    // 如果存在密钥
    if (cloudFunction.secret) {
      const secret = req.headers['x-secret'];
      if (secret !== cloudFunction.secret) {
        throw new Error('Cloud function secret not match');
      }
    }
    // 检查是否存在 JavaScript 代码，如果有，直接执行
    await this.runCloudFunctionCode(cloudFunction, req, res);
  }

  private async runCloudFunctionCode(
    cloudFunction: CloudFunction,
    req: Request,
    res: Response,
  ): Promise<void> {
    const code =
      cloudFunction.javascriptCode ||
      (await this.compileTypeScript(cloudFunction.code));
    // 动态导入 NodeVM
    const vm2 = await import('vm2');
    const vm = new vm2.NodeVM({
      console: 'inherit',
      sandbox: { req, res },
      require: {
        external: true,
        root: './',
      },
    });

    try {
      vm.run(
        `
        ${code}

        if (typeof main !== 'function') {
          throw new Error('Cloud function must export a main function');
        }

        main(req, res);
      `,
        'vm.js',
      );
    } catch (error) {
      console.error('Error executing cloud function:', error);
      throw new Error('Internal server error');
    }
  }

  private async compileTypeScript(code: string): Promise<string> {
    const ts = await import('typescript');
    return ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
  }
}
