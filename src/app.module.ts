import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FollowModule } from './follow/follow.module';
import { PostreplyModule } from './postreply/postreply.module';
import { NewspeedModule } from './newspeed/newspeed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [process.env.DB_ENTITIES],
      synchronize: true,
      timezone: 'local',
      keepConnectionAlive: true,
    }),
    UserModule,
    EmailModule,
    AuthModule,
    PostModule,
    FollowModule,
    PostreplyModule,
    NewspeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
