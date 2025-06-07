import { ApplicationError } from './application-error';

export class ValidationError extends ApplicationError {
  statusCode = 400;

  constructor(message = 'Invalid data') {
    super(message);
  }
}
