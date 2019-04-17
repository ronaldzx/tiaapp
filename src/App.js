import React, { Component } from 'react';
import Form from './componentes/Form';
import './App.css';
import Header from './componentes/Header';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header/> 
        <Form/>
      </div>
    );
  }
}

export default App;
