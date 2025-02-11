import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterByEmailDto, RegisterByPhoneDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/email')
  async registerByEmail(@Body() dto: RegisterByEmailDto) {
    return this.authService.register(dto, 'email');
  }

  @Post('register/phone')
  async registerByPhone(@Body() dto: RegisterByPhoneDto) {
    return this.authService.register(dto, 'phone');
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
