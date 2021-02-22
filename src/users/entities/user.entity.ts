import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

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
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: "enum", enum: UserRole })
  @Field((type) => UserRole)
  role: UserRole;
}
