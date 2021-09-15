import { Document } from 'mongoose'

enum Status {
    ativo = 'ativo',
    inativo = 'inativo'
}

export interface Empresa extends Document{
    readonly id: string
    nome: string
    endereco: string
    status: Status
}