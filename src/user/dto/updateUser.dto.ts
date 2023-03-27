import { Prop } from "@nestjs/mongoose";
import { IsEmpty } from "class-validator";
import { UserAddress } from "src/user-address/schemas/user-address.schema";

export class updateUserDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  password: string;
}