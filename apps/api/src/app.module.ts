import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../../../ormconfig';
import { GeneralModule } from './general/general.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GeneralModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
