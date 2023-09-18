import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtModule } from '@nestjs/jwt'
import  {jwtConstants} from '../consts/jwt.const';
import { JwtStrategyService } from './auth/jwt-strategy/jwt-strategy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    JwtModule.register({secret:jwtConstants.secret }),
    MongooseModule.forFeature([{name :'Users', schema:UserSchema}]),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherService, JwtStrategyService],
})
export class UsersModule {}
