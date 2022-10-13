import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
        private configService:ConfigService
    ){
        super(
            {
                secretOrKey:configService.get('JWT_SECRET'),
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        
        }
        );
    }


    async validate(payload:JwtPayload):Promise<User>{

        
        
            
        
        //CUando el token es valido y no ha expirado
        const {id}=payload;

        const user= await this.userRepository.findOneBy({id});

        if(!user) throw new UnauthorizedException('Token Invalid')
        if(!user.isActive) throw new UnauthorizedException('User is inactive, talk with admin');

        console.log({user});
        //Se regresa en la request 
        return user;
    }


}