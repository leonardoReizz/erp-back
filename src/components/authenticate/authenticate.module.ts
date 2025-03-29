import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { OrganizationRepository } from '../organization/organization.repository';
@Module({
  controllers: [AuthenticateController],
  providers: [
    AuthenticateService,
    UserRepository,
    JwtService,
    OrganizationRepository,
  ],
})
export class AuthenticateModule {}
