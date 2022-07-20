import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GENERAL_CONTROLLER_PREFIX, ROUTES } from '../constants';
import { GeneralService } from '../services';

@Controller(GENERAL_CONTROLLER_PREFIX)
@ApiTags('general')
export class GeneralController {

  constructor(private readonly generalService: GeneralService) {}

  @Get(ROUTES.HELLO)
  hello(): string {
    return this.generalService.helloWorld();
  }

}
