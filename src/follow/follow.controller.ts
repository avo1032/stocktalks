import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':followingId')
  @UseGuards(JwtAuthGuard)
  async createFollow(
    @Param('followingId') followingId: number,
    @CurrentUser() user: User,
  ) {
    return this.followService.createFollow(user, followingId);
  }
}
