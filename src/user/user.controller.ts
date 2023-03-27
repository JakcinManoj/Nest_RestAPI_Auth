import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { loginDto } from './dto/login.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('users')
export class UserController {
    constructor( private userService : UserService) {}

    @Get()
    async findAll(@Query() query: ExpressQuery): Promise<User[]> {
        return this.userService.findAll(query);
    }


    @Post('/Register')
    async create(@Body() user: User): Promise<{ token : string}> {        
        return this.userService.create(user);
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.updateById(id, user);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.deleteById(id);
    }

    @Get('Login')
    async login(@Body() user: loginDto): Promise<{ token: string }> {
        return this.userService.login(user);
    }
}
