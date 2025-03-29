import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './authenticate.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/env';
import { User } from '@prisma/client';
import { OrganizationRepository } from '../organization/organization.repository';
@Injectable()
export class AuthenticateService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (data.provider === 'GOOGLE' && !user) {
      throw new BadRequestException('User not found');
    }
    if (!user) throw new BadRequestException('Invalid credentials');

    if (data.provider === 'GOOGLE') {
      if (user.providerId === data.providerId) {
        return {
          accessToken: this.generateToken({
            user,
            permissions: [],
          }),
          refreshToken: this.generateRefreshToken(user),
        };
      } else {
        throw new BadRequestException('Invalid provider id');
      }
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.hashedPassword,
    );
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    return {
      accessToken: this.generateToken({
        user,
        permissions: [],
      }),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async register(data: RegisterDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new BadRequestException('User already exists');

    if (data.provider === 'GOOGLE') {
      await this.userRepository.create({
        name: data.name,
        email: data.email,
        hashedPassword: '',
        provider: data.provider,
        providerId: data.providerId,
      });

      return { message: 'User created' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await this.userRepository.create({
      name: data.name,
      email: data.email,
      hashedPassword,
      provider: data.provider,
    });

    return { message: 'User created' };
  }

  generateToken({
    user,
    permissions,
  }: {
    user: Pick<User, 'id' | 'email'>;
    permissions: {
      organization_id: string;
      permission: string;
      zone_restriction: string[];
    }[];
  }) {
    const payload = { sub: user.id, email: user.email, permissions };
    return this.jwtService.sign(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '6h',
    });
  }

  generateRefreshToken(user: Pick<User, 'id' | 'email'>) {
    const payload = { sub: user.id, email: user.email, refreshToken: true };

    return this.jwtService.sign(payload, {
      secret: env.JWT_SECRET,
      expiresIn: '3d',
    });
  }
}
