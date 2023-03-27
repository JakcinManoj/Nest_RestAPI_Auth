import { Body, Controller, Param, Req } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UserAddress } from './schemas/user-address.schema';
import { UserAddressService } from './user-address.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-address')
export class UserAddressController {
    constructor( private userAddressService : UserAddressService) {}

    @Get()
    async findAll(): Promise<UserAddress[]> {
        return this.userAddressService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserAddress> {
        return this.userAddressService.findOne(id);
    }

    
    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() userAddress: UserAddress, @Req() req): Promise<UserAddress> {
        return this.userAddressService.create(userAddress, req.user);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userAddress: UserAddress): Promise<UserAddress> {
        return this.userAddressService.updateById(id, userAddress);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<UserAddress> {
        return this.userAddressService.deleteById(id);
    }
}
