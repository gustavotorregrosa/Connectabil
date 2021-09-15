import React, { Component, useState } from 'react';

class VagaService extends Component {

    http = null
    setHttp = http => this.http = http

    getVagas = async () => {
        const params = {
            url: '/vagas',
            method: 'get'
        }

        let vagas = await this.http.doFetch(params)
        return vagas
    }


    deleteVaga = async (vaga) => {
        let params = {
            url: '/vagas/' + vaga.id,
            method: 'delete'
        }
        let dataVaga = await this.http.doFetch(params)
        return dataVaga
    }

    salvaVaga = async (vaga) => {
        let params = {
            url: '/vagas',
            method: 'post',
            data: { ...vaga }
        }
        if(vaga.id){
            params = {
                ...params,
                method: 'put',
                url: '/vagas/' + vaga.id
            }
        }
        
        let dataVaga = await this.http.doFetch(params)
        return dataVaga
    }
}

export default VagaService