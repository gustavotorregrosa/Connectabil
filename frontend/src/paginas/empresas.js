import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/index/navbar'
import EmpresaContext from '../contexts/EmpresaContext'
import Tabela from '../components/misc/tabela'
import ModalCriaEdita from '../components/empresas/modalCriaEdita'
import ModalDeleta from '../components/empresas/modalDeleta'

const EmpresaPage = props => {

    const empresaService = useContext(EmpresaContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const campos = [
        {
            name: 'nome',
            label: 'Nome'
        },
        {
            name: 'endereco',
            label: 'Endereço'
        },
        {
            name: 'status',
            label: 'Status'
        },
        {
            name: 'actions',
            label: 'Ações'
        },
    ]


    const listaEmpresas = async () => {
        setLoading(true)
        const data = await empresaService.getEmpresas()
        setData(data)
        setLoading(false)
    }

    useEffect(async () => {
        await listaEmpresas()
    }, [])

    const openModalNew = ev => {
        ev.preventDefault()
        const e = new CustomEvent('cria-empresas')
        document.dispatchEvent(e)
    }

    
    return (<div>
         <div className="container">
            <h4>Empresas</h4>
            <a className="waves-effect right" onClick={e => openModalNew(e)}><i className="medium material-icons">add_box</i></a>
            <Tabela campos={campos} data={data} loading={loading} eventName="empresas" />
            <ModalCriaEdita listaEmpresas={() => listaEmpresas()} />
            <ModalDeleta listaEmpresas={() => listaEmpresas()} />
          </div>
    </div>)
}


export default EmpresaPage