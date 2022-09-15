import { Module } from '@nestjs/common';
import { AuthLibModule } from '@libs/auth';
import * as Controllers from './controllers';
import * as Services from './services';

@Module({
  imports: [AuthLibModule],
  controllers: Object.values(Controllers),
  providers: Object.values(Services),
})
export class AuthModule {}
