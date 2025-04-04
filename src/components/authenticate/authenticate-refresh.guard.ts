import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';

@Injectable()
export class AuthRefresh implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    if (!request.user.refreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
