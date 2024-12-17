import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { LoginInfo } from './entities/loginInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, LoginInfo])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
