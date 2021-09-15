import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresasModule } from './empresas/empresas.module';
import { VagasModule } from './vagas/vagas.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@mongo:27017',
    { }),
    EmpresasModule,
    VagasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
