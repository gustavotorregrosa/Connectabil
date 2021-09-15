enum Status {
    ativo = 'ativo',
    inativo = 'inativo'
}

export interface ICriaEmpresa {
    nome: string
    endereco: string
    status: Status
}