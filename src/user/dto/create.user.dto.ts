import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

  @IsNotEmpty()
  @ApiProperty({ description: '이름', example: '유승완' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '인사말',
    example: 'Hello, world!',
  })
  readonly comment: string;
}
