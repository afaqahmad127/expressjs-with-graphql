type errorTypes = {
  [key: string]: string;
};

export const errorCodes: errorTypes = {
  userAlreadyExists: 'userAlreadyExists',
  noDesignation: 'noDesignation has been created yet',
  designationAlreadyExists: 'designationAlreadyExists',
  userNotExistsWithThisEmail: 'userNotExistsWithThisEmail',
  salaryNotFound: 'salaryNotFound',
  designationNotFound: 'designationNotFound',
  yourPasswordIsIncorrect: 'yourPasswordIsIncorrect',
  invalidCredentials: 'invalidCredentials',
  badRequest: 'badRequest',
  unauthorized: 'unauthorized',
  paymentRequired: 'paymentRequired',
  forbidden: 'forbidden',
  notFound: 'notFound',
  notAllowed: 'notAllowed',
  conflict: 'conflict',
  internalServerError: 'internalServerError',
  studentNotExist: 'studentNotExist',
  coursesNotFound: 'coursesNotFound',
  error: 'error',
};
