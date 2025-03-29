import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OrganizationCreateInput) {
    return await this.prisma.organization.create({
      data,
    });
  }

  async findById(id: string) {
    return await this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return await this.prisma.organization.findFirst({
      where: {
        OrganizationUser: {
          some: { userId },
        },
      },
    });
  }
}
