import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LogInUserDto } from './dto/login.user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenResponseDto } from './dto/accesstoken.response.dto';
import { SendVerificationEmailDto } from './dto/sendverificationemail.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('email/send-verification')
  @ApiOperation({ summary: '인증메일 발송' })
  async sendVerificationEmail(@Body() body: SendVerificationEmailDto) {
    return this.emailService.sendVerificationEmail(body.email);
  }

  @Get('/email-verify')
  @ApiOperation({ summary: '이메일 인증' })
  async verifyEmail(@Query('verify_token') verify_token: string) {
    return this.emailService.verifyEmail(verify_token);
  }

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: AccessTokenResponseDto,
  })
  async signUp(@Body() body: CreateUserDto) {
    return await this.userService.signUp(body);
  }

  @Post('log-in')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: AccessTokenResponseDto,
  })
  async logIn(@Body() body: LogInUserDto) {
    return await this.userService.logIn(body);
  }
}
