import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostReply } from './entities/postreply.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostreplyService {
  constructor(
    @InjectRepository(PostReply)
    private readonly postReplyRepository: Repository<PostReply>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createReply(
    user: User,
    input: {
      postId: number;
      content: string;
    },
  ) {
    const { content, postId } = input;
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new BadRequestException('게시글이 존재하지 않습니다');
    }
    const reply = new PostReply();
    reply.user = user;
    reply.post = post;
    reply.content = content;

    const newReply = await this.postRepository.save(reply);
    return newReply;
  }
}
