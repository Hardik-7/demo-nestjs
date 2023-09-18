import { Controller, Post,Get, Body, UseFilters, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupRes, SigninRes } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../comman/filters/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
   
  ) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<SignupRes>{
    return await this.usersService.signup(user)
  }

  @Post('signin')
  async signin(@Body() user: CreateUserDto): Promise<SigninRes>{
    return await this.usersService.signin(user)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('jokes')
  async randomJokes(){
    return this.usersService.randomJokes()
  }



}
