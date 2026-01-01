import User, { IUser } from "../databases/models/user.model";

export const findUserByEmail = (email: string) =>
  User.findOne({ email });

export const createUser = (data: Partial<IUser>) =>
  User.create(data);
