import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  // async createPost(title: string, content: string, user: User): Promise<Post> {
  //   const post = new Post();
  //   post.title = title;
  //   post.content = content;
  //   post.user = user;
  //   return await this.postRepository.save(post);
  // }
}
