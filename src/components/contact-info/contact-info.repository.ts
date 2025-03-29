import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

export class ContactInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ContactInfoCreateInput) {
    return await this.prisma.contactInfo.create({ data });
  }
}
