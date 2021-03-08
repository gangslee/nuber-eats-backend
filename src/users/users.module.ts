import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // DB 테이블을 이용하기 위해 Repository를 import
    ConfigService, // ConfigModule로 설치 설정한걸 외부 모듈에서도 사용할 수 있게 해줌
  ],
  providers: [UsersResolver, UsersService], // import한걸 제공하기 위해 provider에 넣어줌
})
export class UsersModule {}
