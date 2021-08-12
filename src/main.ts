import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvVariables, EnvVariablesTypes } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvVariables>>(ConfigService);

  const port = configService.get(EnvVariablesTypes.PORT);
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
