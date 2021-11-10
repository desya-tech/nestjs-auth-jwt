import { Controller, Post, Body, Get, UseGuards } from  '@nestjs/common';
import { AuthService } from  './auth.service';
import { User } from  './user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private  readonly  authService:  AuthService) {}
    @Post('login')
    async login(@Body() user: User): Promise<any> {
      return this.authService.login(user);
    }  

    @Post('register')
    async register(@Body() user: User): Promise<any> {
      return this.authService.register(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getHello(): string {
        return "data";
    }
}
