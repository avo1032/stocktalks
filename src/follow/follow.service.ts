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

  async createFollow(user: User, followingId: number) {
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

  async deleteFollow(user: User, followingId: number) {
    const follow = await this.followRepository.findOne({
      where: {
        follower: { id: user.id },
        following: { id: followingId },
      },
      relations: ['follower', 'following'],
    });
    if (!follow) {
      throw new BadRequestException('팔로우 관계를 확인할 수 없습니다.');
    }
    await this.followRepository.remove(follow);
    return;
  }
}
