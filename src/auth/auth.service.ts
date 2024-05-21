import { JwtService } from '@/jwt/jwt.service';
import { UserService } from '@/user/user.service';
import { getHash } from '@/utils/getHash';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    const foundUser = await this.userService.findByEmail(registrationDto.email);

    if (foundUser) {
      throw new BadRequestException('This user already exists.');
    }

    const passwordHash = await getHash(registrationDto.password);

    await this.userService.create({
      email: registrationDto.email,
      password: passwordHash,
    });

    return { success: true };
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.userService.findByEmail(loginDto.email);

    if (!foundUser) {
      throw new BadRequestException('Incorrect login or password.');
    }

    const isCorrectPassword = await compare(
      loginDto.password,
      foundUser.password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('Incorrect login or password.');
    }

    const userId = foundUser._id.toString();

    const payload = { userId };

    const refreshToken = await this.jwtService.generateRefreshToken(payload);

    const accessToken = this.jwtService.getAccessToken(payload);

    return {
      refreshToken,
      accessToken,
    };
  }
}
