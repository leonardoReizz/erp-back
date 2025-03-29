import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from './authenticate.dto';
import { AuthenticateService } from './authenticate.service';

@ApiTags('Authenticate')
@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authenticateService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return this.authenticateService.register(body);
  }
}
