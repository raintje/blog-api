import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors();

    await app.listen(configService.getOrThrow<number>('PORT'), '0.0.0.0');
}

bootstrap().catch((e) => console.error(e));
