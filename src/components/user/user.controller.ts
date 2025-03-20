import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../authenticate/authenticate.guard';
import { UpdatePasswordDTO } from './user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Request() req: AuthRequest) {
    return await this.userService.getUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('password')
  async updatePassword(
    @Request() req: AuthRequest,
    @Body() body: UpdatePasswordDTO,
  ) {
    return await this.userService.updatePassword(req.user.sub, body);
  }
}
