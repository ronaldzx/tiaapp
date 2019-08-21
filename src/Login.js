import React, { Component } from 'react';
import { PostData } from './api/PostData';
import { Redirect } from 'react-router-dom';
import './Login.css';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            PostData('Login', this.state).then((result) => {
                var responseJson = result;
                console.log(Object.keys(responseJson).length)

                if ((Object.keys(responseJson).length) > 0) {
                    sessionStorage.setItem('responseJson', responseJson);
                    this.setState({
                        redirect: true
                    })
                } else {
                    console.log('login error :(')
                }
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/Home'} />)
        }
        if (sessionStorage.getItem('responseJson')) {
            return (<Redirect to={'/Home'} />)
        }
        return (
            <div>
                <div class="d-flex justify-content-center h-100">
                    <div class="card mt-5">
                        <div class="card-header">
                            <h3>Inicio de Sesión</h3>
                            <h5>Sistema de Ingresos y Salidas</h5>
                            <div class="d-flex justify-content-end social_icon">
                            </div>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="username" name="username" onChange={this.onChange} />

                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="password" name="password" onChange={this.onChange} />
                                </div>
                                <div class="row align-items-center remember">
                                    <input type="checkbox" />
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Login" class="btn float-right login_btn" onClick={this.login} />
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center links">
                                Si no tiene credenciales, póngase en contacto con el administrador
                                </div>
                            <div class="d-flex justify-content-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}
export default Login;