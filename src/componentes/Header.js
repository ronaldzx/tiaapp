import React, { Component } from 'react';
import logo from '../img/logo_tia.png';
import '../Login.css';
var color = {
    color: 'white'
}

class Header extends Component {
    render(){
        return(
        <div className="pos-f-t">
              <div className="d-flex justify-content-center bg-dark p-2">
                <h5>Bienvenido</h5>
              </div>
        </div>
        );        
    }
}

export default Header;