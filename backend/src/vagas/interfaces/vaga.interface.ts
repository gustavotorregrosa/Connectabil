import { Document } from 'mongoose'

enum Status {
    ativo = 'ativo',
    inativo = 'inativo'
}

enum Tipo {
    presencial = 'presencial',
    remota = 'remota',
    mista = 'mista'
}

export interface Vaga extends Document{
    readonly id: string
    nome: string
    descricao: string
    status: Status
    tipo: Tipo
    empresas: string[]
}