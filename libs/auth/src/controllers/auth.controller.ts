import { Body, Controller, HttpCode, HttpStatus, Post, Res, Req, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { COOKIES_OPTIONS } from 'config';

import { Response } from 'express';
import { COOKIE, COOKIE_EXPIRES, USER_ROLE } from '@libs/constants';

import { UserEntity } from '@libs/entities';
import {
  SignInBodyDTO,
  SignInResponseDTO,
  SignUpBodyDTO,
  SignUpResponseDTO,
  MeResponseDTO,
} from '../dtos/auth.controller.dtos';
import { AuthService } from '../services/auth.service';
import { Auth } from '../decorators/auth.decorator';
import { RequestWithUser } from '../dtos/request.with.user.dto';

const cookieSecureOptions = {
  httpOnly: true,
  sameSite: COOKIES_OPTIONS.SAME_SITE,
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('me')
  @Auth(USER_ROLE.ADMIN, USER_ROLE.USER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MeResponseDTO })
  public async me(@Req() { user }: RequestWithUser): Promise<MeResponseDTO> {
    return new MeResponseDTO(await this.authService.getMe(user.id));
  }

  @Post('sign-up')
  public async signUp(@Body() { login, password }: SignUpBodyDTO, @Res() res: Response): Promise<void> {
    await this.authService.signUp(login, password);

    const accessToken = await this.authorize(res, { login, password });

    res.send(new SignUpResponseDTO(accessToken));
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignInResponseDTO })
  public async signIn(@Body() { login, password }: SignInBodyDTO, @Res() res: Response): Promise<void> {
    const accessToken = await this.authorize(res, { login, password });

    res.send(new SignInResponseDTO(accessToken));
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  public signOut(@Res() res: Response): void {
    res.clearCookie(COOKIE.ACCESS_TOKEN, cookieSecureOptions);
    res.send();
  }

  private async authorize(res: Response, { login, password }: Pick<UserEntity, 'login' | 'password'>): Promise<string> {
    const { id, role } = await this.authService.signIn(login, password);
    const accessToken = this.jwtService.sign({ id, role });

    res.cookie(COOKIE.ACCESS_TOKEN, accessToken, {
      expires: COOKIE_EXPIRES(),
      ...cookieSecureOptions,
    });

    return accessToken;
  }

}
