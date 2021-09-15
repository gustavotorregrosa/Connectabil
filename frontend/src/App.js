import { Route, Switch, withRouter, Redirect } from 'react-router'
import Index from './paginas/index'
import './App.css';
import HttpService from './services/http'
import EmpresaService from './services/empresas'
import VagaService from './services/vagas'
import HttpContext from './contexts/HttpContext'
import EmpresaContext from './contexts/EmpresaContext'
import VagaContext from './contexts/VagaContext'
import NavBar from './components/index/navbar'
import EmpresasPage from './paginas/empresas'
import VagasPage from './paginas/vagas'

function App(props) {

  const httpService = new HttpService(props)
  const empresaService = new EmpresaService(props)
  const vagaService = new VagaService(props)

  empresaService.setHttp(httpService)
  vagaService.setHttp(httpService)

  return (
    <>
      {/* <HttpContext.Provider value={httpService}> */}
        <EmpresaContext.Provider value={empresaService}>
          <VagaContext.Provider value={vagaService}>
            <>
              <NavBar {...props} />
              <Switch>
                <Route path="/empresas" component={EmpresasPage} />
                <Route path="/vagas" component={VagasPage} />
                <Route path="/" component={Index} />
              </Switch>
            </>
          </VagaContext.Provider>
        </EmpresaContext.Provider>
      {/* </HttpContext.Provider> */}

    </>
  )

}

export default withRouter(App)
