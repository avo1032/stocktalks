import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create.post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@CurrentUser() user: User, @Body() body: CreatePostDto) {
    return this.postService.createPost(body, user);
  }

  @Get()
  async getAllPost() {
    return this.postService.getAllPost();
  }

  @Get(':postId')
  async getOnePost(@Param('postId') postId: number) {
    return this.postService.getOnePost(postId);
  }
}
