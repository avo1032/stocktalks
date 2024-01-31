import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ModifyPostDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '포스트 ID',
    example: 5,
  })
  readonly postId: 3;

  @IsOptional()
  @ApiProperty({
    description: '포스트 제목',
    example: '제목 예시',
  })
  readonly title: string;

  @IsOptional()
  @ApiProperty({
    description: '포스트 내용',
    example: '내용 예시',
  })
  readonly content: string;
}
