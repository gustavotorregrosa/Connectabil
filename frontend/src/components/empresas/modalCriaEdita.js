import React, { useRef, useEffect, useState, useContext } from 'react'
import EmpresaContext from '../../contexts/EmpresaContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const ModalCriaEdita = props => {

    const empresaService = useContext(EmpresaContext)

    const [id, setId] = useState(null)
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [ativo, setAtivo] = useState('inativo')
    const [loading, setLoading] = useState(false)

    const modal = useRef(null)

    const renderLoading = () => {
        if(!loading){
            return null
        }

        return (<div class="progress">
            <div class="indeterminate"></div>
        </div>)
    }

    useEffect(() => {
        document.addEventListener('edita-empresas', e => {
            let { _id, nome, status, endereco } = e.detail.data
            setId(_id)
            setNome(nome)
            setAtivo(status)
            setEndereco(endereco)
            openModal()
        })

        document.addEventListener('cria-empresas', e => {
            setId(null)
            setNome('')
            setAtivo('inativo')
            setEndereco('')
            openModal()
        })

    }, [])

    const openModal = () => {
        const instance = M.Modal.init(modal.current, {})
        if(instance){
            instance.open()
        }
        setTimeout(() => {
            M.updateTextFields()
        }, 100)

    }

    const closeModal = () => {
        const instance = M.Modal.init(modal.current, {})
        if(instance){
            instance.close()
        }
        
        setTimeout(() => {
            M.updateTextFields()
        }, 100)
    }

    const doSave = async e => {
        e.preventDefault()
        setLoading(true)
        await empresaService.salvaEmpresa({ id, nome, status: ativo, endereco })
        closeModal()
        setLoading(false)
        await props.listaEmpresas()
    }

    const toggleAtivo = e => {
        if(ativo == 'ativo'){
            setAtivo('inativo')
        }else{
            setAtivo('ativo')
        }

    }

    const checked = () => ativo == 'ativo'

    return (<div>
        <div ref={modal} className="modal">
            <div className="modal-content">
                <div className="row">
                    <div className="input-field col s6">
                        <input value={nome} onChange={e => setNome(e.target.value)} id="name" type="text" className="validate" />
                        <label htmlFor="name">Nome</label>
                    </div>
                    <div className="input-field col s6">
                        <label htmlFor="name">Ativa</label>
                        <br/><br/>
                        <div className="switch">
                            <label>
                                Off
                                <input onChange={e => toggleAtivo(e)} checked={checked()} type="checkbox" />
                                <span className="lever"></span>
                                On
                            </label>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input value={endereco} id="endereco" onChange={e => setEndereco(e.target.value)} type="text" className="validate" />
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={e => doSave(e)} className="waves-effect waves-green btn-flat">Salvar</a>
            </div>
            {renderLoading()}
        </div>
    </div>)

}

export default ModalCriaEdita
