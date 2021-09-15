import { ExceptionFilter, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAtualizaEmpresa } from "./interfaces/atualiza-empresa.dto";
import { ICriaEmpresa } from "./interfaces/cria-empresa.dto";
import { Empresa } from "./interfaces/empresa.interface";

@Injectable()
export class EmpresasService{

    constructor(@InjectModel ('Empresa') private readonly empresaModel: Model<Empresa>){}

    listaEmpresas = async (): Promise<Array<Empresa>> => {
        return await this.empresaModel.find({isDeleted: false}).exec()
    }

    listaEmpresa = async (id: string): Promise<Empresa> => {
        const empresa: Empresa = await this.empresaModel.findOne({_id: id, isDeleted: false}).exec()
        if(!empresa){
            throw new NotFoundException(`Empresa com id ${id} não encontrada`)
        }

        return empresa
    }

    atualizaEmpresa = async (id: string, empresaDTO: IAtualizaEmpresa) => {
        const empresaEncontrada = await this.empresaModel.findOne({_id: id, isDeleted: false}).exec()
        if (!empresaEncontrada) {
            throw new NotFoundException(`Empresa com id ${id} não econtrada`)
        }

        try{
            await this.empresaModel.updateOne({_id: id}, 
                {$set: empresaDTO}).exec()
            return await this.empresaModel.findById(id).exec()
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }

    }


    addEmpresa = async (empresaDTO: ICriaEmpresa): Promise<Empresa> => {
        try{
            const empresaCriada = new this.empresaModel(empresaDTO)
            await empresaCriada.save()
            return empresaCriada
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }
     
    }

    deletaEmpresa = async (id): Promise<Empresa> => {
        const empresa: Empresa & { isDeleted: boolean, deletedAt: Date} = await this.empresaModel.findOne({_id: id, isDeleted: false}).select('+isDeleted').exec() as Empresa & { isDeleted: boolean, deletedAt: Date}
        if(!empresa){
            throw new NotFoundException(`Empresa com id ${id} não encontrada`)
        }

        try{
            empresa.isDeleted = true
            empresa.deletedAt = new Date()
            await empresa.save()
            return empresa
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }

    }


}