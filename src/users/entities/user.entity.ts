import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum, IsString } from "class-validator";
// bcrypt : hash, hash를 확인하는 기능을 제공하는 라이브러리

enum UserRole {
  Owner,
  Client,
  Delivery,
} // enum은 숫자 열거를 문자로 표현 한 것  Owner:0, Client:1, Delivery:2...

registerEnumType(UserRole, { name: "UserRole" });
// Set enum Type in graphQL

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  // BeforeInsert Decorater : listener의 한 종류 Insert되기 전에 하단에 mark한 method 실행
  // listener : entity에 무슨일이 생길 때 실행되는 것 (트리거 같은거)
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10); // 2번째 파라미터 : 몇번 hash하면 되겠는가?
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
