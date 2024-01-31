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

    const newReply = await this.postReplyRepository.save(reply);
    return newReply;
  }

  async modifyReply(
    user: User,
    input: {
      postReplyId: number;
      content: string;
    },
  ) {
    const { postReplyId, content } = input;
    const reply = await this.postReplyRepository.findOne({
      where: { id: postReplyId },
      relations: ['user'],
    });
    if (!reply) {
      throw new BadRequestException('댓글이 존재하지 않습니다.');
    }
    if (reply.user.id !== user.id) {
      ('댓글의 작성자만 수정할 수 있습니다.');
    }
    reply.content = content;
    await this.postReplyRepository.save(reply);
    return reply;
  }
}
