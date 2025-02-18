import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRideDto } from './dto/order.dto';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Ride } from './schemas/ride.schema';
import { Model } from 'mongoose';

@Injectable()
export class RideService {
  constructor(
    @InjectModel(Ride.name) private readonly rideModel: Model<Ride>,
    private readonly userService: UserService,
  ) {}

  async order(dto: OrderRideDto, email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new ForbiddenException('User with this email not found');
    }

    const { destination, distance, discount } = dto;
    const cost = (await this.countCost(distance, discount)) * -1;
    const ride = new this.rideModel({ destination, distance, user, cost });
    ride.save();

    return {
      status: 'ok',
      ride,
    };
  }

  async getRideDetails(rideId: string) {
    const ride = await this.rideModel.findById(rideId);
    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

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
