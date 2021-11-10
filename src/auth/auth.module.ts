import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secretOrPrivateKey: 'secret12356789'
    }),
],
providers: [UserService, AuthService],
controllers: [AuthController]
})
export class AuthModule {}
