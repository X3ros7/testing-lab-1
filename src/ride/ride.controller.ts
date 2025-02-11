import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrderRideDto } from './dto/order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('order')
  async order(@Body() dto: OrderRideDto, @Request() req) {
    return this.rideService.order(dto, req.user.email);
  }
}
