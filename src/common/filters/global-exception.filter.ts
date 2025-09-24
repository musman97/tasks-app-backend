import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response as ExpressResponse } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants';
import { ErrorResponse } from '../interfaces';

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    const errorResponse = {
      success: false,
      message,
    } satisfies ErrorResponse;

    response.status(status).json(errorResponse);
  }
}
