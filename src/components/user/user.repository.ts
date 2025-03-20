import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { hashedPassword },
    });
  }
}
