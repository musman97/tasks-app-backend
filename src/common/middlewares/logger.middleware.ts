import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') ?? '';

    this.logger.log(`[${method}] ${originalUrl} - ${ip} - ${userAgent}`);

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `[${method}] ${originalUrl} - ${statusCode} - ${ip} - ${userAgent}`,
      );
    });

    next();
  }
}
