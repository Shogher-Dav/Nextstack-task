import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import Token from "./token.model";
import "dotenv/config";
const { sign, verify } = jwt;

export default class TokenService {
  generateTokens(payload: JwtPayload) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET as Secret, {
      expiresIn: "1d",
    });
    const refreshToken = sign(
      payload,
      process.env.JWT_REFRESH_SECRET as Secret,
      { expiresIn: "30d" },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = verify(token, process.env.JWT_ACCESS_SECRET as Secret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = verify(token, process.env.JWT_REFRESH_SECRET as Secret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}
