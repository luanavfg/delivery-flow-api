import { ApplicationError } from './application-error';

export class EmailConflictError extends ApplicationError {
  statusCode = 409;

  constructor(message = 'This email is already in use.') {
    super(message);
  }
}
