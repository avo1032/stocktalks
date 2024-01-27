import { IsNotEmpty } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  verify_token: string;
}
