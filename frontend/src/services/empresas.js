import React, { Component, useState } from 'react';

class EmpresaService extends Component {

    http = null
    setHttp = http => this.http = http

    getEmpresas = async () => {
        const params = {
            url: '/empresas',
            method: 'get'
        }

        let empresas = await this.http.doFetch(params)
        return empresas
    }


    deleteEmpresa = async (empresa) => {
        let params = {
            url: '/empresas/' + empresa.id,
            method: 'delete'
        }
        let dataEmpresa = await this.http.doFetch(params)
        return dataEmpresa
    }

    salvaEmpresa = async (empresa) => {
        let params = {
            url: '/empresas',
            method: 'post',
            data: { ...empresa }
        }
        if(empresa.id){
            params = {
                ...params,
                method: 'put',
                url: '/empresas/' + empresa.id
            }
        }
        
        let dataEmpresa = await this.http.doFetch(params)
        return dataEmpresa
    }
}

export default EmpresaService