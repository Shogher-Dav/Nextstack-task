import { compare, hash } from "bcrypt";
import TokenServise from "../../auth/token.servise";
import BadRequestError from "../../middlewares/BadRequestError";

import User from "./user.model";
import UserDto from "./dto/user.dto";
import "dotenv/config";

export default class UserService {
  tokenService = new TokenServise();

  async registration(email: string, password: string) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new BadRequestError({
        code: 409,
        message: "User with this email already exist",
        logging: true,
      });
    }
    const salt = 3;
    const hashPassword = await hash(password, salt);

    const user = await User.create({ email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError({
        code: 404,
        message: "User not found",
        logging: true,
      });
    }

    const isPassEquals = await compare(password, user?.password as string);
    if (!isPassEquals) {
      throw new BadRequestError({
        code: 401,
        message: "Wrong password",
        logging: true,
      });
    }
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestError({
        code: 401,
        message: "UnauthorizedError",
        logging: true,
      });
    }
    const userData = this.tokenService.validateRefreshToken(
      refreshToken,
    ) as any;
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new BadRequestError({
        code: 401,
        message: "UnauthorizedError",
        logging: true,
      });
    }
    const user = await User.findById(userData?.id);
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });

    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}
