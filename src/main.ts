import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)


  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'products',
      protoPath: join(process.cwd(),'src/nestjs-products/proto/product.proto'),
      url: configService.get('GRPC_CONNECTION_URL_2')
    },
  })
  app.startAllMicroservices();
  app.init()
}
bootstrap();
