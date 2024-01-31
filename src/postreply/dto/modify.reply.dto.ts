import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ModifyReplyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 id',
    example: 3,
  })
  readonly postReplyId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 예시',
  })
  readonly content: string;
}
