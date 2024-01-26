import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendVerificationEmailDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
  })
  readonly email: string;
}
