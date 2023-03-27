import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UserAddress } from './schemas/user-address.schema';

@Injectable()
export class UserAddressService {
    constructor(@InjectModel(UserAddress.name)
    private userAddressModule: mongoose.Model<UserAddress>) {}

    async findAll(): Promise<UserAddress[]> {
        const getAllUsers = await this.userAddressModule.find();
        return getAllUsers;
    }

    async findOne(id: string): Promise<UserAddress> {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) {
            throw new NotFoundException('Enter valid Id');
        }
        const findById = await this.userAddressModule.findById(id);
        if (!findById) {
            throw new NotFoundException('User not found');
        }
        return findById;
    }

    async create(userAddress: UserAddress, user: User): Promise<UserAddress> {
        const data = Object.assign(userAddress, { user: user._id, createdAt: new Date(), updatedAt: new Date(), userAge: user.age });
        const newUserAddress = await this.userAddressModule.create(data);
        return newUserAddress;
    }

    async updateById(id: string, userAddress: UserAddress): Promise<UserAddress> {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) {
            throw new NotFoundException('Enter valid Id');
        }
        const findById = await this.userAddressModule.findById(id);
        if (!findById) {
            throw new NotFoundException('User not found');
        }
        const updatedUserAddress = await this.userAddressModule.findByIdAndUpdate(id, userAddress, { new: true });
        return updatedUserAddress;
    }

    async deleteById(id: string): Promise<UserAddress> {
        const validId = mongoose.Types.ObjectId.isValid(id);
        if (!validId) {
            throw new NotFoundException('Enter valid Id');
        }
        const findById = await this.userAddressModule.findById(id);
        if (!findById) {
            throw new NotFoundException('User not found');
        }
        const deletedUserAddress = await this.userAddressModule.findByIdAndDelete(id);
        return deletedUserAddress;
    }
}

