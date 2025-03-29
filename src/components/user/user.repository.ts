import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { v4 as uuidv4 } from 'uuid';
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
    const userId = uuidv4();
    const organizationId = uuidv4();
    const [createdUser] = await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          ...user,
          id: userId,
        },
      }),
      this.prisma.organization.create({
        data: {
          id: organizationId,
          OrganizationUser: {
            create: {
              userId,
              role: 'OWNER',
            },
          },
        },
      }),
    ]);

    return createdUser;
  }

  async updatePassword(id: string, hashedPassword: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { hashedPassword },
    });
  }
}
