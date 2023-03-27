import { Prop } from "@nestjs/mongoose";

export class loginDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}