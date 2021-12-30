import { ClassConstructor, plainToClass } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/ban-types
export function construct<T>(obj: { constructor: Function | ClassConstructor<T> }, data: T): T {
  const ctor = obj.constructor as ClassConstructor<T>;
  const result = plainToClass(ctor, data);
  return result;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function selfConstruct<T>(obj: { constructor: Function | ClassConstructor<T> }, data: T): void {
  Object.assign(obj, construct(obj, data));
}

export class ConstructableDTO<T> {
  constructor(body: T) {
    const result = construct(this, body);
    return result;
  }
}
