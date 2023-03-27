import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserAddress } from "src/user-address/schemas/user-address.schema";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';



@Schema({ timestamps: true })

export class User extends Document {

    @Prop({ required: true })

    name: string;

    @Prop({ required: true })

    age: number;

    @Prop({ required: true })

    password: string;

    
}

export const UserSchema = SchemaFactory.createForClass(User);