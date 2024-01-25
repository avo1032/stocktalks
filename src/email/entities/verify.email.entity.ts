import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'verify_email' })
export class VerifyEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  verify_token: string;

  @Column({ default: 0 })
  verified: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
