import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrderRideDto } from './dto/order.dto';
import { UserService } from 'src/user/user.service';
import { Ride } from './interfaces/ride.interface';

@Injectable()
export class RideService {
  private readonly rides: Ride[] = [];
  constructor(private readonly userService: UserService) {}

  async order(dto: OrderRideDto, email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException('User with this email not found');
    }

    const { destination, distance, discount } = dto;

    const cost = await this.countCost(distance, discount);
    const ride: Ride = {
      destination,
      distance,
      user: user.username,
      cost,
    };

    this.rides.push(ride);
    return {
      status: 'ok',
      ride,
    };
  }

  private async countCost(distance: number, discount: number) {
    if (distance <= 50) {
      return distance * 1.5 * discount;
    } else if (distance > 50 && distance <= 1000) {
      return distance * 2 * discount;
    } else {
      return distance * 5 * discount;
    }
  }
}
