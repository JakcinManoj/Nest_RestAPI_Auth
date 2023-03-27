import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { createUserDto } from './dto/user.dto';
import { Query } from 'express-serve-static-core';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { UserAddress } from 'src/user-address/schemas/user-address.schema';


@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService,
    ) {}

    async findAll(query : Query): Promise<User[]> {
        const limit = Number(query.limit) || 2;
        const currentpage = Number(query.pageNumber) || 1;
        const skip = (currentpage - 1) * limit;


        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};
        const getAllUsers = await this.userModel.find({ ...keyword}).limit(limit).skip(skip);
        return getAllUsers;
    }


    async create(user: User): Promise<{ token: string}> {
        const { name, age, password } = user;
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await this.userModel.create({
            name,
            age,
            password: hashedPassword,
            });

            const token = this.jwtService.sign({ id: newUser._id });

        return { token };
    }

    async updateById(id: string, user: User): Promise<User> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });
        if (!updateUser) {
            throw new NotFoundException('User not found');
        }
        return updateUser;
    }

    async deleteById(id: string): Promise<User> {
        const deleteUser = await this.userModel.findByIdAndDelete(id);
        if (!deleteUser) {
            throw new NotFoundException('User not found');
        }
        return deleteUser;
    }

    async login(userDto: loginDto ): Promise<{ token: string}> {
        const { name, password } = userDto;

        const user = await this.userModel.findOne({ name });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // const ispasswordMatch = await bcrypt.compare(password, user.password);
        // if (!ispasswordMatch) {
        //     throw new NotFoundException('Password is wrong');
        // }

        const token = this.jwtService.sign({ id: user._id });

        return { token };

    }
}
