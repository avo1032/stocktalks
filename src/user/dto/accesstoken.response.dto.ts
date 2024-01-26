import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN3YW4xMDMyQG5hdmVyLmNvbSIsInN1YiI6MywiaWF0IjoxNzA2MjY3NjAwLCJleHAiOjE3MDYzNTQwMDB9.PWUOc95H3Zg_BFnWknL_fwXuJ8u1XjuMHiLoSlwVWt0',
  })
  access_token: string;
}
