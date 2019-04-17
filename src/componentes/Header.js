import React, { Component } from 'react';
import logo from '../img/logo_tia.png';
var color = {
    color: 'white'
}

class Header extends Component {
    render(){
        return(
        <div className="pos-f-t">
              <div className="d-flex justify-content-center bg-dark p-4">
                {/* <div>                
                  <img src={logo} width="90px"  alt=""/>
                  <span style={color}>SISTEMA DE CONTROL DE INGRESO Y SALIDA DE PRODUCTOS</span>
                </div> */}
              </div>
        </div>
        );        
    }
}

export default Header;