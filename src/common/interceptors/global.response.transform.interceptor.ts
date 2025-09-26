import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as EResponse } from 'express';
import { PaginatedResponseDto, ResponseDto } from '../dto';
import { PaginatedResponse, Response } from '../interfaces';

@Injectable()
export class GlobalResponseTransformInterceptor<D>
  implements
    NestInterceptor<
      ResponseDto<D> | PaginatedResponseDto<D>,
      Response<D> | PaginatedResponse<D>
    >
{
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<ResponseDto<D> | PaginatedResponseDto<D>>,
  ):
    | Observable<Response<D> | PaginatedResponse<D>>
    | Promise<Observable<Response<D> | PaginatedResponse<D>>> {
    return next.handle().pipe(
      map((responseData) => {
        if (responseData.statusCode) {
          ctx
            .switchToHttp()
            .getResponse<EResponse>()
            .status(responseData.statusCode);
        }

        if (responseData.data || responseData.message) {
          return { success: true, ...responseData };
        }

        return { success: true };
      }),
    );
  }
}
