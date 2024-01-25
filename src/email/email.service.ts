import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { v4 as uuidv4 } from 'uuid';
import { VerifyEmail } from './entities/verify.email.entity';
import { Repository } from 'typeorm';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @InjectRepository(VerifyEmail)
    private emailRepository: Repository<VerifyEmail>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(email: string) {
    const verify_token = uuidv4();
    const isExistEmail = await this.checkEmailExists(email);
    if (!!isExistEmail) {
      if (isExistEmail.verified === 1) {
        return '이미 인증된 이메일 입니다.';
      } else {
        isExistEmail.verify_token = verify_token;
        await this.emailRepository.save(isExistEmail);
      }
    } else {
      await this.emailRepository.save({ email, verify_token });
    }
    const url = `http://localhost:4000/user/email-verify?veryfy_token=${verify_token}`;
    const mailOptions: EmailOptions = {
      to: email,
      subject: '가입 인증 메일',
      html: `
      <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
          <h2 style="color: #444;">StockTalks 환영합니다!</h2>
          <p style="color: #777; margin-bottom: 30px;">회원 가입을 완료하려면 아래 버튼을 클릭해주세요.</p>
          <a href="${url}" style="background-color: #4CAF50; color: white; text-decoration: none; padding: 15px 32px; text-align: center; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border: none;">가입 확인</a>
      </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  async checkEmailExists(email: string) {
    const isExistEmail = await this.emailRepository.findOne({
      where: { email },
    });
    return isExistEmail;
  }

  async verifyEmail(verify_token: string) {
    const email = await this.emailRepository.findOne({
      where: { verify_token },
    });
    if (!email || email.verified === 1) {
      throw new BadRequestException(
        '이미 인증되었거나 인증신청된 이메일이 아닙니다.',
      );
    }
    email.verified = 1;
    return await this.emailRepository.save(email);
  }
}
