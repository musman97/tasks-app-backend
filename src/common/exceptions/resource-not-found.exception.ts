import { HttpException, HttpStatus } from '@nestjs/common';
import { RESOURCE_NOT_FOUND } from '../constants';

export class ResourceNotFoundException extends HttpException {
  constructor(message: string = RESOURCE_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
