import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HelloControllerResponseDTO } from '../dtos';
import { HelloService } from '../services';

@Controller('/hello')
@ApiTags('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: HelloControllerResponseDTO })
  @Get('/')
  async hello(): Promise<HelloControllerResponseDTO> {
    const message = await this.helloService.helloWorld();
    return new HelloControllerResponseDTO({ message });
  }
}
