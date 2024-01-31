import { BadRequestException, Injectable } from '@nestjs/common';
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
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'postReplies', 'postReplies.user'],
    });
    if (!post) {
      throw new BadRequestException('포스트가 존재하지 않습니다.');
    }
    return post;
  }

  async modifyPost(
    user: User,
    input: {
      postId: number;
      title: string;
      content: string;
    },
  ) {
    const { postId, title, content } = input;
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'postReplies', 'postReplies.user'],
    });
    if (!post) {
      throw new BadRequestException('포스트가 존재하지 않습니다.');
    }
    if (user.id !== post.user.id) {
      throw new BadRequestException(
        '해당 포스트의 작성자만 삭제할 수 있습니다.',
      );
    }
    !!title ? (post.title = title) : post.title;
    !!content ? (post.content = content) : post.content;
    await this.postRepository.save(post);

    return post;
  }

  async deletePost(user: User, postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user', 'postReplies'],
    });
    if (!post) {
      throw new BadRequestException('포스트가 존재하지 않습니다.');
    }
    if (user.id !== post.user.id) {
      throw new BadRequestException(
        '해당 포스트의 작성자만 삭제할 수 있습니다.',
      );
    }
    await this.postRepository.softRemove(post);
    return '삭제되었습니다';
  }
}
