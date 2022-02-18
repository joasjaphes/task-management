import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    const salt = await bcrypt.genSalt();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username arleady exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return username;
    } else {
      if (!user) {
        throw new UnauthorizedException('Wrong username');
      } else if (!(await user.validatePassword(password))) {
        throw new UnauthorizedException('Wrong password');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
