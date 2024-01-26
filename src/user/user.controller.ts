import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('email/send-verification')
  async sendVerificationEmail(@Body('email') email: string) {
    return this.emailService.sendVerificationEmail(email);
  }

  @Get('/email-verify')
  async verifyEmail(@Query('verify_token') verify_token: string) {
    return this.emailService.verifyEmail(verify_token);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.userService.signUp(body);
  }
}
