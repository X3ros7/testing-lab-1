import {
  Controller,
  Get,
  InternalServerErrorException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async me(@Request() req) {
    throw new InternalServerErrorException('Not accessible');
  }
}
