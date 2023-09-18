import { Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../../consts/jwt.const';
import { UsersService } from '../../users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService,
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }
    async validate(payload: any){
        const user = await this.userService.validateByUserId(payload.id)
        if(user){
            return user
        }else{
            throw new UnauthorizedException();
        }
    }

}
