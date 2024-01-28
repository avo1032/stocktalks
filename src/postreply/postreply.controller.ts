import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostreplyService } from './postreply.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/user/entities/user.entity';
import { CreateReplyDto } from './dto/create.reply.dto';

@ApiTags('Post-Reply')
@Controller('post-reply')
export class PostreplyController {
  constructor(private readonly postReplyService: PostreplyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '포스트댓글 작성' })
  async createReply(@CurrentUser() user: User, @Body() body: CreateReplyDto) {
    return this.postReplyService.createReply(user, body);
  }
}
