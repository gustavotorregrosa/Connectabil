import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { VagasService } from './vagas.service';
import { IAtualizaVaga } from './interfaces/atualiza-vaga.dto';
import { ICriaVaga } from './interfaces/cria-vaga.dto';

@Controller('vagas')
export class VagasController {

    constructor(private readonly vagasService: VagasService){}

    @Get()
    async listaVagas(){
        return await this.vagasService.listaVagas()
    }

    @Get(':_id')
    async listaVaga(@Param('_id') id: string){
        return await this.vagasService.listaVaga(id)
    }

    @Put(':_id')
    async atualizaVaga(@Param('_id') id: string, @Body() vaga: IAtualizaVaga){
        return await this.vagasService.atualizaVaga(id, vaga)
    }

    @Post()
    async criarVaga(@Body() vaga: ICriaVaga){
        return await this.vagasService.addVaga(vaga)
    }

    @Delete(':_id')
    async deletaVaga(@Param('_id') id: string){
        return await this.vagasService.deletaVaga(id)
    }

}
