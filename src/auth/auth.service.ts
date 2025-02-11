import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterByEmailDto,
  RegisterByPhoneDto,
  RegisterDto,
} from './dto/register.dto';
import { RegisterType } from './types/register.types';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto, registrationType: RegisterType) {
    if (registrationType === 'email') {
      const emailDto = dto as RegisterByEmailDto;
      if (!emailDto.email) {
        throw new BadRequestException('No email provided');
      }

      return this.registerByEmail(emailDto);
    } else if (registrationType === 'phone') {
      const phoneDto = dto as RegisterByPhoneDto;

      if (!phoneDto.phone) {
        throw new BadRequestException('No phone provided');
      }
      return this.registerByPhone(phoneDto);
    }
  }

  async registerByEmail(dto: RegisterByEmailDto) {
    const { email, password, username } = dto;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.userService.add(password, username, email);
    return this.generateTokens(newUser.id, email);
  }

  async registerByPhone(dto: RegisterByPhoneDto) {
    const { phone, password, username } = dto;

    const existingUser = await this.userService.findOneByPhone(phone);
    if (existingUser) {
      throw new BadRequestException('User with this phone already exists');
    }

    const newUser = await this.userService.add(password, username, null, phone);
    return this.generateTokens(newUser.id, undefined, phone);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      this.logger.error(`Cannot find user with email ${dto.email}`);
      throw new UnauthorizedException('User not found');
    }

    if (user.password !== dto.password) {
      this.logger.error(`Wrong password for user with email ${user.email}`);
      throw new UnauthorizedException('Wrong password');
    }

    this.logger.debug(`User ${user.username} was successfully logged in`);
    return this.generateTokens(user.id, user.email, user.phone);
  }

  private async generateTokens(id: number, email?: string, phone?: string) {
    const payload = { sub: id, email, phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
