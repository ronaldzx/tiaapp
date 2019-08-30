import React, { Component } from 'react';
import { PostData } from '../api/PostData';
import logo from '../img/logo_tia.png';
import '../Login.css';
var color = {
  color: 'white'
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="pos-f-t">
        <div className="d-flex justify-content-center bg-dark p-2">
          <h5>Bienvenido {this.props.nombre}</h5>
        </div>
      </div>
    );
  }
}

export default Header;