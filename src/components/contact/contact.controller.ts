import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { AuthGuard } from '../authenticate/authenticate.guard';
import { UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDTO } from './contact.dto';
import { ContactService } from './contact.service';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CreateContactDTO, @Request() req: AuthRequest) {
    const userId = req.user.sub;
    return await this.contactService.create(userId, body);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get()
  async fetchByOrganizationId(@Request() req: AuthRequest) {
    return await this.contactService.fetchByOrganizationId(req.user.sub);
  }
}
