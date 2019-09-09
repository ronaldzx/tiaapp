import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import ImgHome from './img/home.jpeg';
import LogoTia from './img/logo_tia.png';
import Logout from './componentes/Logout';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            nombre: '',
            apellido: ''
        };
    }
    componentDidMount() {
        if (sessionStorage.getItem('responseJson')) {
            console.log('conecta2')
        } else {
            this.setState({ redirect: true })
        }
        let data = JSON.parse(sessionStorage.getItem("responseJson"));
        {
            data.map(props => {
                this.setState({
                    nombre: props.usu_vcNombres, apellido: props.usu_vcApellido
                })
                console.log(props.usu_vcNombres)
            })
        }
    }
    render() {
        if (this.state.redirect) {
            return (<Redirect to={'./'} />)
        }

        return (
            <div className="container-fluid">
                <div className="container d-flex mt-4 pb-5 ">
                    <div className="contenedorHome">
                        <img className="imagenHome" src={ImgHome}></img>
                    </div>
                    <div className="contenedorHome">
                        <div class="hometitle">
                            SISTEMA DE REGISTRO Y COSNULTAS DE ALMACÉN
                        </div>
                        <div>
                            <img className="logoTia" src={LogoTia} />
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <Link to={'./Consultas'}>
                                    <button type="button" className='btn btn-success homebtn'>Ir a Salidas</button>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={'./Form'}>
                                    <button type="button" className='btn btn-success homebtn'>Ir a Ingresos</button>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <Link to={'./GraficoBarra'}>
                                    <button type="button" className='btn btn-success homebtn'>Ir a Gráficos</button>
                                </Link>
                            </div>
                            <div className="col">
                                <Link to={'./GraficoLineal'}>
                                    <button type="button" className='btn btn-success homebtn'>Ir a Gráficos Lineales</button>
                                </Link>
                            </div>
                        </div>                        
                        <div className="row mt-1">
                            <div className="col">
                                <Logout />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;