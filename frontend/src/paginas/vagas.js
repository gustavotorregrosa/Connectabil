import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/index/navbar'
import VagaContext from '../contexts/VagaContext'
import EmpresaContext from '../contexts/EmpresaContext'
import Tabela from '../components/misc/tabela'
import ModalCriaEdita from '../components/vagas/modalCriaEdita'
import ModalDeleta from '../components/vagas/modalDeleta'

const VagaPage = props => {

    const vagaService = useContext(VagaContext)
    const empresaService = useContext(EmpresaContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [empresas, setEmpresas] = useState([])

    const campos = [
        {
            name: 'nome',
            label: 'Nome'
        },
        {
            name: 'descricao',
            label: 'Descrição'
        },
        {
            name: 'status',
            label: 'Status'
        },
        {
            name: 'tipo',
            label: 'Tipo'
        },
        {
            name: 'actions',
            label: 'Ações'
        },
    ]


    const listaVagas = async () => {
        setLoading(true)
        const data = await vagaService.getVagas()
        setData(data)
        setLoading(false)
    }

    const listaEmpresas = async () => {
        const empresas = await empresaService.getEmpresas()
        setEmpresas(empresas)
    }

    useEffect(async () => {
        listaEmpresas()
        listaVagas()
    }, [])

    const openModalNew = ev => {
        ev.preventDefault()
        const e = new CustomEvent('cria-vagas')
        document.dispatchEvent(e)
    }

    
    return (<div>
         <div className="container">
            <h4>Vagas</h4>
            <a className="waves-effect right" onClick={e => openModalNew(e)}><i className="medium material-icons">add_box</i></a>
            <Tabela campos={campos} data={data} loading={loading} eventName="vagas" />
            <ModalCriaEdita empresas={empresas} listaVagas={() => listaVagas()} />
            <ModalDeleta listaVagas={() => listaVagas()} />
          </div>
    </div>)
}


export default VagaPage