import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostreplyService } from './postreply.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/user/entities/user.entity';
import { CreateReplyDto } from './dto/create.reply.dto';
import { ModifyReplyDto } from './dto/modify.reply.dto';

@ApiTags('Post-Reply')
@Controller('post-reply')
export class PostreplyController {
  constructor(private readonly postReplyService: PostreplyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 작성' })
  async createReply(@CurrentUser() user: User, @Body() body: CreateReplyDto) {
    return this.postReplyService.createReply(user, body);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 수정' })
  async modifyReply(@CurrentUser() user: User, @Body() body: ModifyReplyDto) {
    return this.postReplyService.modifyReply(user, body);
  }

  @Delete(':postReplyId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 삭제' })
  async deleteReply(
    @CurrentUser() user: User,
    @Param('replyId') postReplyId: number,
  ) {
    return this.postReplyService.deleteReply(user, postReplyId);
  }
}
