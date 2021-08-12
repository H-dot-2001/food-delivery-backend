import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvVariables, EnvVariablesTypes } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService<EnvVariables>) {
        return {
          type: 'postgres',
          host: configService.get(EnvVariablesTypes.DATABASE_HOST),
          port: configService.get(EnvVariablesTypes.DATABASE_PORT),
          username: configService.get(EnvVariablesTypes.DATABASE_USERNAME),
          password: configService.get(EnvVariablesTypes.DATABASE_PASSWORD),
          database: configService.get(EnvVariablesTypes.DATABASE_NAME),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
