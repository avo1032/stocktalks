import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '포스트 id',
    example: 3,
  })
  readonly postId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 예시',
  })
  readonly content: string;
}
