import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class OrderRideDto {
  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsNumber()
  distance: number;

  @ApiProperty({ required: false })
  @IsNumber()
  discount?: number;
}
