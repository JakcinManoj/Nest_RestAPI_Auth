import { Prop } from "@nestjs/mongoose";

export class createUserDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  password: string;

}