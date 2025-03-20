import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthenticateController],
  providers: [AuthenticateService, UserRepository],
})
export class AuthenticateModule {}
