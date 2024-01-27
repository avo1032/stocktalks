import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('USER');
    const request = ctx.switchToHttp().getRequest();
    logger.log(`{ userId: ${request.user.id} }`);
    return request.user;
  },
);
