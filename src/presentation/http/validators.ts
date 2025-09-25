import { plainToInstance } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Matches, Min } from 'class-validator';

export class CutQueryDTO {
  @IsOptional()
  @IsString()
  @Matches(/^\d{1,2}:\d{2}(:\d{2})?$|^\d+(\.\d+)?$/)
  start?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{1,2}:\d{2}(:\d{2})?$|^\d+(\.\d+)?$/)
  end?: string;

  @IsOptional()
  @IsString()
  outputExtension?: string;
}

export function toValidatedQuery<T>(cls: new () => T, obj: unknown): Promise<T> {
  const instance = plainToInstance(cls, obj);
  return new Promise((resolve, reject) => {
    import('class-validator').then(({ validate }) => {
      validate(instance as object, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {
        if (errors.length) {
          reject(new Error('Parâmetros inválidos'));
        } else {
          resolve(instance);
        }
      });
    });
  });
}

