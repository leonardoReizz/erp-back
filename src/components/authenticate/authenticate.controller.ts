import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRefresh } from './authenticate-refresh.guard';
import { LoginDTO, RegisterDTO } from './authenticate.dto';
import { AuthenticateService } from './authenticate.service';

@ApiTags('Authenticate')
@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}
  @HttpCode(201)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authenticateService.login(body);
  }

  @UseGuards(AuthRefresh)
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return this.authenticateService.register(body);
  }
}
