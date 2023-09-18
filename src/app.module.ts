import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env' 
    }),
    UsersModule, 
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest') 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
