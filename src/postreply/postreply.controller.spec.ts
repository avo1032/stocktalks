import { Test, TestingModule } from '@nestjs/testing';
import { PostreplyController } from './postreply.controller';

describe('PostreplyController', () => {
  let controller: PostreplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostreplyController],
    }).compile();

    controller = module.get<PostreplyController>(PostreplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
