import React, { useRef, useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const IndexNavbar = props => {

    let navBarMobile = useRef(null)
    let instance

    useEffect(() => {
        instance = M.Sidenav.init(navBarMobile.current, {})
    }, [])

    const redirect = (e, pagina) => {
        e.preventDefault()
        props?.history?.push('/' + pagina)
    }

    return (<div>
        <nav className="black">
            <div className="nav-wrapper container">
                <a href="#" onClick={e => redirect(e, '')} className="brand-logo">Connectabil</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="#" onClick={e => redirect(e, 'empresas')}>Empresas</a></li>
                    <li><a href="#" onClick={e => redirect(e, 'vagas')}>Vagas</a></li>
                </ul>
            </div>
        </nav>

        <ul ref={navBarMobile} className="sidenav" id="mobile-demo">
            <li><a href="#" onClick={e => redirect(e, 'empresas')}>Empresas</a></li>
            <li><a href="#" onClick={e => redirect(e, 'vagas')}>Vagas</a></li>
        </ul>

    </div>)
}

export default IndexNavbar