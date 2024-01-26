import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
    private authService: AuthService,
  ) {}

  async signUp(input: {
    email: string;
    password: string;
    name: string;
    comment: string;
  }) {
    const { email, password, name, comment } = input;
    const isVerifiedEmail = await this.emailService.checkEmailExists(email);
    if (!isVerifiedEmail || isVerifiedEmail.verified !== 1) {
      throw new BadRequestException('인증된 이메일이 아닙니다.');
    }
    const isExistUser = await this.userRepository.findOne({ where: { email } });
    if (!!isExistUser) {
      throw new BadRequestException('이미 가입되어있는 이메일 입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      password: hashedPassword,
      name,
      comment,
    };
    const savedUser = await this.userRepository.save(user);
    return await this.authService.generateJwtToken(savedUser);
  }
}
