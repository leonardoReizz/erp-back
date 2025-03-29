import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AddressCreateInput) {
    return await this.prisma.address.create({
      data,
    });
  }
}
