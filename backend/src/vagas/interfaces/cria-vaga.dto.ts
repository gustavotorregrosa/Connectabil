enum Status {
    ativo = 'ativo',
    inativo = 'inativo'
}

enum Tipo {
    remota = 'remota',
    presencial = 'presencial',
    mista = 'mista'
}

export interface ICriaVaga {
    nome: string
    descricao: string
    status: Status
    tipo: Tipo,
    empresas: string[]
}