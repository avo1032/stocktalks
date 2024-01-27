import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createFollow(user: User, followingId: number): Promise<Follow> {
    const following = await this.userRepository.findOne({
      where: { id: followingId },
    });
    if (!following) {
      throw new BadRequestException('팔로우 유저정보가 올바르지 않습니다.');
    }

    const follow = new Follow();
    follow.follower = user;
    follow.following = following;

    return this.followRepository.save(follow);
  }
}
