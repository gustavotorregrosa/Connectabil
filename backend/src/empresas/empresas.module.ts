import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';
import { EmpresaSchema } from './interfaces/empresa.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Empresa', schema: EmpresaSchema}])],
    controllers: [EmpresasController],
    providers: [EmpresasService],
  })
export class EmpresasModule {}
