import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '포스트 제목',
    example: '제목 예시',
  })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '포스트 내용',
    example: '내용 예시',
  })
  readonly content: string;
}
