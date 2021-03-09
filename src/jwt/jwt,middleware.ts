import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

@Injectable()
// implements => 해당 class가 해당 interface처럼 행동해야 한다고 정의
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ("x-jwt" in req.headers) {
      const token = req.headers["x-jwt"];
      const decoded = this.jwtService.verify(token.toString());

      if (typeof decoded === "object" && decoded.hasOwnProperty("id")) {
        try {
          const user = await this.userService.findById(decoded["id"]);
          req["user"] = user; // user정보를 header에서 request로 보냄
        } catch (e) {}
      }
    }
    next();
  }
}
