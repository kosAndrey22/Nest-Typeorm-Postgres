import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ExampleEntity } from '@libs/entities';

@Injectable()
@EntityRepository(ExampleEntity)
export class ExampleRepository extends Repository<ExampleEntity> {

}
