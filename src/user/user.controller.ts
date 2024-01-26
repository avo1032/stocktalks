import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LogInUserDto } from './dto/login.user.dto';

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

  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto) {
    return await this.userService.signUp(body);
  }

  @Post('log-in')
  async logIn(@Body() body: LogInUserDto) {
    return await this.userService.logIn(body);
  }
}
