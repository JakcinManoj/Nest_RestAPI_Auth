import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserAddressSchema } from './schemas/user-address.schema';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [UserModule,
    MongooseModule.forFeature([
    { name: 'UserAddress', schema: UserAddressSchema },
  ])],
  controllers: [UserAddressController],
  providers: [UserAddressService]
})
export class UserAddressModule {}
