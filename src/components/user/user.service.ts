import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdatePasswordDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async updatePassword(id: string, body: UpdatePasswordDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new BadRequestException('User not found');

    await this.userRepository.updatePassword(id, body.password);

    return {
      message: 'Password updated successfully',
    };
  }
}
