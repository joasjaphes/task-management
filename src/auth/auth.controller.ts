import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signIn')
  async signIn(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accesstoken: string }> {
    return await this.authService.signIn(authCredentials);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() req) {
    console.log('Request', req);
    // return 'Hellow';
  }
}
