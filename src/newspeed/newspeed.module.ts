import { Module } from '@nestjs/common';
import { NewspeedController } from './newspeed.controller';
import { NewspeedService } from './newspeed.service';

@Module({
  controllers: [NewspeedController],
  providers: [NewspeedService]
})
export class NewspeedModule {}
