import { ExceptionFilter, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAtualizaVaga } from "./interfaces/atualiza-vaga.dto";
import { ICriaVaga } from "./interfaces/cria-vaga.dto";
import { Vaga } from "./interfaces/vaga.interface";

@Injectable()
export class VagasService{

    constructor(@InjectModel ('Vaga') private readonly vagaModel: Model<Vaga>){}

    listaVagas = async (): Promise<Array<Vaga>> => {
        return await this.vagaModel.find({isDeleted: false}).exec()
    }

    listaVaga = async (id: string): Promise<Vaga> => {
        const Vaga: Vaga = await this.vagaModel.findOne({_id: id, isDeleted: false}).exec()
        if(!Vaga){
            throw new NotFoundException(`Vaga com id ${id} não encontrada`)
        }

        return Vaga
    }

    atualizaVaga = async (id: string, vagaDTO: IAtualizaVaga) => {
        const empresaVaga = await this.vagaModel.findOne({_id: id, isDeleted: false}).exec()
        if (!empresaVaga) {
            throw new NotFoundException(`Vaga com id ${id} não econtrada`)
        }

        try{
            await this.vagaModel.updateOne({_id: id}, 
                {$set: vagaDTO}).exec()
            return await this.vagaModel.findById(id).exec()
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }

    }


    addVaga = async (vagaDTO: ICriaVaga): Promise<Vaga> => {
        try{
            const vagaCriada = new this.vagaModel(vagaDTO)
            await vagaCriada.save()
            return vagaCriada
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }
     
    }

    deletaVaga = async (id): Promise<Vaga> => {
        const vaga: Vaga & { isDeleted: boolean, deletedAt: Date} = await this.vagaModel.findOne({_id: id, isDeleted: false}).select('+isDeleted').exec() as Vaga & { isDeleted: boolean, deletedAt: Date}
        if(!vaga){
            throw new NotFoundException(`Vaga com id ${id} não encontrada`)
        }

        try{
            vaga.isDeleted = true
            vaga.deletedAt = new Date()
            await vaga.save()
            return vaga
        }catch(e: any){
            throw new HttpException(e.message, 500)
        }

    }


}