import { Module } from '@nestjs/common';
import { PostreplyController } from './postreply.controller';
import { PostreplyService } from './postreply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { PostReply } from './entities/postreply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostReply])],
  controllers: [PostreplyController],
  providers: [PostreplyService],
})
export class PostreplyModule {}
