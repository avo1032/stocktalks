import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyEmail } from './entities/verify.email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyEmail])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
