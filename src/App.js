import React, { Component } from 'react';
import Form from './componentes/Form';
import './App.css';
import Header from './componentes/Header';
import Consultas from './componentes/Consultas';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/> 
        <Form/>
        {/* <Consultas/> */}
      </div>
    );
  }
}

export default App;
