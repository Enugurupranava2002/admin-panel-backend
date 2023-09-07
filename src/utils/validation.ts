const { validationResult } = require("express-validator");

const { throwError } = require("./error");

export const validateAuthRequest = (req: any) => {
  const errors = validationResult(req);

  if (errors && !errors.isEmpty()) {
    throwError("Validation failed", 422, errors);
  }

  if (!req.body.email) {
    throwError("Email is required", 422, errors);
  }

  if (req.body.email.indexOf("@") === -1) {
    throwError("Email must be valid", 422, errors);
  }

  if (!req.body.password) {
    throwError("Password is required", 422, errors);
  }

  if (req.body.password.length < 6 || req.body.password.length > 100) {
    throwError(
      "Password must be between 6 and 100 characters long",
      422,
      errors
    );
  }
};
