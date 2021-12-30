import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralService } from '../services';

@Controller('general')
@ApiTags('general')
export class GeneralController {

  constructor(private readonly generalService: GeneralService) {}

  @Get('')
  hello(): string {
    return this.generalService.helloWorld();
  }

}
