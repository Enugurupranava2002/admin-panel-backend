export const throwError = (message: any, statusCode: any, errors: any) => {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  if (errors && errors.array && errors.array().length > 0) {
    error.data = errors.array();
  }
  throw error;
};
