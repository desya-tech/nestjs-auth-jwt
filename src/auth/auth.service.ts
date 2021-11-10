import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from  './user/user.service';
import { User } from  'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private async validate(userData: User): Promise<User> {
        console.log(userData)
        return await this.validateUser(userData.name,userData.password);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                name: username,
              },
        });
        // console.log(user)
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
            // console.log(userData)
            if(!userData){
                throw new UnauthorizedException();
          }
          let payload = `${userData.name}${userData.id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload,
             status: 200
          };

        });
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    } 
}
