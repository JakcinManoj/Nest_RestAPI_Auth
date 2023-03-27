import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/schemas/user.schema";
import * as mongoose from 'mongoose';

export enum AddressType {
    HOME = "HOME",
    OFFICE = "OFFICE",
    OTHER = "OTHER"
}


@Schema({ timestamps: true})
export class UserAddress {
    @Prop({ required: true })
    address: string;
    @Prop({ required: true })
    city: string;
    @Prop({ required: true })
    state: string;
    @Prop({ required: true })
    country: string;
    @Prop({ required: true })
    pincode: number;
    @Prop({ required: true })
    type: AddressType;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;

}
export const UserAddressSchema = SchemaFactory.createForClass(UserAddress);