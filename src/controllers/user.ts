import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { throwError } from "../utils/error";
import { validateAuthRequest } from "../utils/validation";
import { User } from "../model/User";

const registerUser = (name: string, email: string, password: string) => {
  return bcrypt.hash(password, 12).then((hashedPassword) => {
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return user.save();
  });
};

export const authenticate = async (req: any, res: any, next: any) => {
  try {
    const errors: any = validateAuthRequest(req);

    if (errors && !errors.isEmpty()) {
      throwError("Validation failed", 422, errors);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      loadedUser = await registerUser(name, email, password);
    } else {
      loadedUser = foundUser;
    }

    const isEqual = await bcrypt.compare(password, loadedUser.password);

    if (!isEqual) {
      throwError("Wrong password", 401, null);
    }

    const token = jwt.sign(
      { userId: loadedUser._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m" }
    );

    res.status(200).json({ token: token });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
