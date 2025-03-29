import { Global, Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';
import { AuthenticateModule } from './components/authenticate/authenticate.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './components/user/user.module';
import { ContactModule } from './components/contact/contact.module';

@Global()
@Module({
  imports: [AuthenticateModule, UserModule, ContactModule],
  providers: [PrismaService, JwtService],
  exports: [PrismaService, JwtService],
})
export class AppModule {}
