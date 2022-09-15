import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PREFIXES, ROUTES } from '../../routes';
import { GeneralControllerHelloResponseDTO } from '../dtos';
import { GeneralService } from '../services';

@Controller(PREFIXES.GENERAL)
@ApiTags('general')
export class GeneralController {

  constructor(private readonly generalService: GeneralService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GeneralControllerHelloResponseDTO })
  @Get(ROUTES.GENERAL.HELLO)
  hello(): GeneralControllerHelloResponseDTO {
    return new GeneralControllerHelloResponseDTO({ message: this.generalService.helloWorld() });
  }

}
