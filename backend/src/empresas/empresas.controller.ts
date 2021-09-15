import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { IAtualizaEmpresa } from './interfaces/atualiza-empresa.dto';
import { ICriaEmpresa } from './interfaces/cria-empresa.dto';

@Controller('empresas')
export class EmpresasController {

    constructor(private readonly empresasService: EmpresasService){}

    @Get()
    async listaEmpresas(){
        return await this.empresasService.listaEmpresas()
    }

    @Get(':_id')
    async listaEmpresa(@Param('_id') id: string){
        return await this.empresasService.listaEmpresa(id)
    }

    @Put(':_id')
    async atualizaEmpresa(@Param('_id') id: string, @Body() empresa: IAtualizaEmpresa){
        return await this.empresasService.atualizaEmpresa(id, empresa)
    }

    @Post()
    async criarEmpresa(@Body() empresa: ICriaEmpresa){
        return await this.empresasService.addEmpresa(empresa)
    }

    @Delete(':_id')
    async deletaEmpresa(@Param('_id') id: string){
        return await this.empresasService.deletaEmpresa(id)
    }

}
