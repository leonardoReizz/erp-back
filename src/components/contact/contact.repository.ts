import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ContactCreateInput) {
    return await this.prisma.contact.create({ data });
  }

  async fetchByOrganizationId(organizationId: string) {
    return await this.prisma.contact.findMany({
      where: {
        organizationId,
      },
    });
  }
}
