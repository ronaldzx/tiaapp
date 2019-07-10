import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Consultas from './componentes/Consultas';
import Form from './componentes/Form';
import App from './App';
import ImgHome from './img/home.jpeg';
import LogoTia from './img/logo_tia.png'
class Home extends Component {
    render() {
        const Home = () => (
            <Switch>
                <Route path='/Consultas' component={Consultas} />
                <Route path='/Form' component={App} />
            </Switch>
        )
        return (
            <div className="container-fluid">
                <div className="container d-flex mt-4 pb-5 ">
                    <div className="contenedorHome">
                        <img className="imagenHome" src={ImgHome}></img>
                    </div>
                    <div className="contenedorHome">
                        <div>
                            SISTEMA DE REGISTRO Y COSNULTAS DE ALMACÉN
                        </div>
                        <div>
                            <img className="logoTia" src={LogoTia}/>
                        </div>
                        <div className="row mt-5">
                            <div className="col">
                                <Link to={'./Consultas'}>
                                    <button type="button" className='btn btn-success'>Ir a Consultas</button>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={'./Form'}>
                                    <button type="button" className='btn btn-success'>Ir a Formulario</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;