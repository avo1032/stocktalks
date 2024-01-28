import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(
    input: {
      title: string;
      content: string;
    },
    user: User,
  ) {
    const { title, content } = input;
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;
    await this.postRepository.save(post);
    return post;
  }

  async getAllPost() {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.repliesCount', 'post.postReplies')
      .select(['post', 'user.name'])
      .getMany();
  }

  async getOnePost(postId: number) {
    return await this.postRepository.find({
      where: { id: postId },
      relations: ['user', 'postReplies', 'postReplies.user'],
    });
  }
}
