import { ApplicationError } from './application-error';

export class NotFoundError extends ApplicationError {
  statusCode = 404;

  constructor(message = 'Resource not found') {
    super(message);
  }
}
