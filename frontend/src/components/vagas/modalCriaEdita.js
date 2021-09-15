import React, { useRef, useEffect, useState, useContext } from 'react'
import VagaContext from '../../contexts/VagaContext'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const ModalCriaEdita = props => {

    const vagaService = useContext(VagaContext)

    const [id, setId] = useState(null)
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [ativo, setAtivo] = useState('inativo')
    const [tipo, setTipo] = useState('presencial')
    const [empresasSelecionadas, setEmpresasSelecionadas] = useState([])
    const [loading, setLoading] = useState(false)

    const modal = useRef(null)

    let selectTipos = null
    let instanciaSelectTipos = null

    let selectEmpresas = null
    let instanciaSelectEmpresas = null

    const renderLoading = () => {
        if(!loading){
            return null
        }

        return (<div class="progress">
                    <div class="indeterminate"></div>
                </div>)
    }

    const ativaSelectEmpresas = () => {
        instanciaSelectEmpresas = M.FormSelect.init(selectEmpresas, {})
    }

    const ativaSelectTipos = () => {
        instanciaSelectTipos = M.FormSelect.init(selectTipos, {})
    }

    useEffect(() => {
        ativaSelectTipos()
        ativaSelectEmpresas()
   
        document.addEventListener('edita-vagas', e => {
            let { _id, nome, status, descricao, tipo, empresas } = e.detail.data
            setId(_id)
            setNome(nome)
            setAtivo(status)
            setDescricao(descricao)
            setTipo(tipo)
            setEmpresasSelecionadas(empresas)
            openModal()
        })

        document.addEventListener('cria-vagas', e => {
            setId(null)
            setNome('')
            setAtivo('inativo')
            setDescricao('')
            setTipo('presencial')
            setEmpresasSelecionadas([])
            openModal()
        })
    })


    const alterarTipos = () => {
        try {
            instanciaSelectTipos.destroy()
        } catch (e) {
            console.log(e)
        }
        ativaSelectTipos()
        let tipo = instanciaSelectTipos.getSelectedValues()[0]
        setTipo(tipo)

    }
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
        await vagaService.salvaVaga({ id, nome, status: ativo, descricao, tipo, empresas: empresasSelecionadas })
        closeModal()
        setLoading(false)
        await props.listaVagas()
    }

    const toggleAtivo = e => {
        if(ativo == 'ativo'){
            setAtivo('inativo')
        }else{
            setAtivo('ativo')
        }
    }

    const listaEmpresas = () => {
        let empresas = []
        props.empresas.map(empresa => {
            if(empresasSelecionadas.includes(empresa._id)){
                empresas.push((<option selected value={empresa._id}>{empresa.nome}</option>))
            }else{
                empresas.push((<option value={empresa._id}>{empresa.nome}</option>))
            }

            
        })

        return empresas
    }

    const selecionaEmpresa = e => {
        setTimeout(() => {
            setEmpresasSelecionadas(instanciaSelectEmpresas.getSelectedValues())
        }, 100)
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
                        <select value={tipo} ref={select => selectTipos = select} onChange={() => alterarTipos()}>
                            <option value="" disabled>Tipo</option>
                            <option value="presencial">Presencial</option>
                            <option value="remota">Remota</option>
                            <option value="mista">Mista</option>
                        </select>
                        <label>Tipo</label>
                    </div>
                 
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input value={descricao} id="endereco" onChange={e => setDescricao(e.target.value)} type="text" className="validate" />
                        <label htmlFor="endereco">Descrição</label>
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
                        <select onChange={e => selecionaEmpresa(e)} multiple ref={select => selectEmpresas = select}>
                            {listaEmpresas()}
                        </select>
                        <label>Empresas</label>
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
