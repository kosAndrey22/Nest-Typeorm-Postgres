import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { COOKIES_OPTIONS } from 'config';
import { Response } from 'express';
import {
  COOKIE,
  ACCESS_COOKIE_EXPIRES,
  REFRESH_COOKIE_EXPIRES,
  USER_ROLE,
} from '@libs/constants';
import { IUserEntity } from '@libs/interfaces';
import { Auth, RefreshTokenAuthDecorator, RequestWithUser } from '@libs/auth';
import {
  JwtAuthDTO,
  SignInBodyDTO,
  SignInResponseDTO,
  SignUpBodyDTO,
  SignUpResponseDTO,
  MeResponseDTO,
} from '../dtos';
import { AuthService } from '../services';
import { PREFIXES, ROUTES } from '../../routes';

const cookieSecureOptions = {
  httpOnly: true,
  sameSite: COOKIES_OPTIONS.SAME_SITE,
};

@ApiTags('auth')
@Controller(PREFIXES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(ROUTES.AUTH.GET_ME)
  @Auth(USER_ROLE.ADMIN, USER_ROLE.USER)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: MeResponseDTO })
  public async me(@Req() req: RequestWithUser): Promise<MeResponseDTO> {
    return new MeResponseDTO(await this.authService.getMeOrFail(req.user.id));
  }

  @Get(ROUTES.AUTH.REFRESH_TOKEN)
  @HttpCode(HttpStatus.OK)
  @RefreshTokenAuthDecorator()
  public refresh(@Req() { user }: RequestWithUser, @Res() res: Response): void {
    const { id, role } = user;
    const accessToken = this.authService.generateAccessToken({ id, role });

    res.cookie(COOKIE.ACCESS_TOKEN, accessToken, {
      expires: ACCESS_COOKIE_EXPIRES(),
      ...cookieSecureOptions,
    });
    res.send();
  }

  @Post(ROUTES.AUTH.SIGN_UP)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResponseDTO })
  public async signUp(
    @Body() { login, password }: SignUpBodyDTO,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.signUpOrFail(login, password);

    const { accessToken, refreshToken } = await this.authenticate(res, {
      login,
      password,
    });

    res.send(new SignUpResponseDTO({ accessToken, refreshToken }));
  }

  @Post(ROUTES.AUTH.SIGN_IN)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignInResponseDTO })
  public async signIn(
    @Body() { login, password }: SignInBodyDTO,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authenticate(res, {
      login,
      password,
    });

    res.send(new SignInResponseDTO({ accessToken, refreshToken }));
  }

  @Post(ROUTES.AUTH.SIGN_OUT)
  @Auth(USER_ROLE.ADMIN, USER_ROLE.USER)
  @HttpCode(HttpStatus.OK)
  public async signOut(
    @Req() { user: { id } }: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.removeRefreshToken(id);
    res.clearCookie(COOKIE.ACCESS_TOKEN, cookieSecureOptions);
    res.clearCookie(COOKIE.REFRESH_TOKEN, cookieSecureOptions);
    res.send();
  }

  private async authenticate(
    res: Response,
    { login, password }: Pick<IUserEntity, 'login' | 'password'>,
  ): Promise<JwtAuthDTO> {
    const { id, role } = await this.authService.signInOrFail(login, password);
    const accessToken = this.authService.generateAccessToken({ id, role });
    const refreshToken = this.authService.generateRefreshToken({ id, role });

    await this.authService.saveUserRefreshToken(refreshToken, id);

    res.cookie(COOKIE.ACCESS_TOKEN, accessToken, {
      expires: ACCESS_COOKIE_EXPIRES(),
      ...cookieSecureOptions,
    });
    res.cookie(COOKIE.REFRESH_TOKEN, refreshToken, {
      expires: REFRESH_COOKIE_EXPIRES(),
      ...cookieSecureOptions,
    });

    return { accessToken, refreshToken };
  }
}
