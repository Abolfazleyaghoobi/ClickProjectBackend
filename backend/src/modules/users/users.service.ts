import { AppError } from "../../shared/errors/app.error";
import { hashPassword, verifyPassword } from "../../shared/utils/hashPassword";
import { Login_interface, Register_interface } from "./users.dto";

import { usersRepository } from "./users.repository";

// register User
export const createUser_service = async (data: Register_interface) => {
  try {
    const existUser = await usersRepository.findOneBy({
      username: data.username,
    });
    if (existUser) {
      throw new AppError("Username already exists", 409);
    }
    const hashPass = await hashPassword(data.password);
    const user = usersRepository.create({
      username: data.username,
      phone: data.phone,
      password_hash: hashPass,
    });
    return usersRepository.save(user);
  } catch (error: any) {
    throw new AppError(error, 500);
  }
};

// login user
export const login_service = async (data: Login_interface) => {

    const existUser = await usersRepository
        .createQueryBuilder("user")
        .addSelect("user.password_hash")
        .where("user.username = :username", {
            username: data.username
        })
        .getOne();

    if (!existUser) {
        throw new AppError("Username not found", 404);
    }

    const isMatch = await verifyPassword(
        data.password,
        existUser.password_hash
    );

    if (!isMatch) {
        throw new AppError("Password not match", 401);
    }

    return existUser;
};
