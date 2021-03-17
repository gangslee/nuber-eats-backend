//guard는 request를 다음 단계로 진행할지 말지 결정하는 함수

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
  // CanActivate는 true를 return하면 request를 진행시키고 false면 request를 멈춤
  canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext["user"];
    if (!user) {
      return false;
    }
    return true;
  }
}
