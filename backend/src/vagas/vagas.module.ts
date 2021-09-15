import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VagasController } from './vagas.controller';
import { VagasService } from './vagas.service';
import { VagaSchema } from './interfaces/vaga.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Vaga', schema: VagaSchema}])],
    controllers: [VagasController],
    providers: [VagasService],
  })
export class VagasModule {}
