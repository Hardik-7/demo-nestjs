import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from  './dto/create-user.dto'
import { User, SignupRes, SigninRes } from './interfaces/user.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt'
import { HttpService } from '@nestjs/axios/dist';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users')
        private readonly UserModel: Model<User>,
        private hasherService: PasswordHasherService,
        private jwtService: JwtService,
        private readonly httpService: HttpService
    ){}

    async signup(doc: CreateUserDto): Promise<SignupRes>{
        // if user has already exist
        const user = await this.UserModel.findOne({email: doc.email})
        if(user){
            throw new UnauthorizedException(`User already create with this email ${doc.email}`)
        }
        const password = await this.hasherService.hashPassword(doc.password)
        const newUser = new this.UserModel({email: doc.email, password: password, name: doc.name})
        await newUser.save()
        return { email: newUser.email } 
    }

    async signin(doc: CreateUserDto): Promise<SigninRes>{
        const user = await this.UserModel.findOne({email: doc.email}).select('+password')
        if(!user){
            throw new UnauthorizedException(`Could not found user with this email ${doc.email}`)
        }
        if(await this.hasherService.comparePassword(doc.password, user.password)){
           const token = await this.jwtService.signAsync({id: user.id}, { expiresIn:'60s' })
           return { token }
        }
        else{
            throw new UnauthorizedException('Invaild password')
        }
    }

    async validateByUserId(userId: String) : Promise<User>{
        const user = await this.UserModel.findById(userId)
        return user
    }
    
    async randomJokes() {
        const resData = await this.httpService.get('https://api.chucknorris.io/jokes/random').toPromise();
        return resData.data
    }

}
