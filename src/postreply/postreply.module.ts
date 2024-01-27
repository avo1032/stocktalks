import { Module } from '@nestjs/common';
import { PostreplyController } from './postreply.controller';
import { PostreplyService } from './postreply.service';

@Module({
  controllers: [PostreplyController],
  providers: [PostreplyService]
})
export class PostreplyModule {}
