import { Test, TestingModule } from '@nestjs/testing';
import { PostreplyService } from './postreply.service';

describe('PostreplyService', () => {
  let service: PostreplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostreplyService],
    }).compile();

    service = module.get<PostreplyService>(PostreplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
