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
}
