import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogInUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '이메일',
    example: 'user@example.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '비밀번호',
    example: 'password123',
  })
  readonly password: string;
}
