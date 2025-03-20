import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './authenticate.dto';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthenticateService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
  }

  async register(data: RegisterDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCreated = await this.userRepository.create({
      name: data.name,
      email: data.email,
      hashedPassword,
      provider: data.provider,
    });

    return userCreated;
  }
}
