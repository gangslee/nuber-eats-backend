import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // DB 테이블을 이용하기 위해 Repository를 import
  ],
  providers: [UsersResolver, UsersService], // import한걸 제공하기 위해 provider에 넣어줌
  exports: [UsersService], // 다른 곳에서도 service를 사용 가능하게 해줌
})
export class UsersModule {}
