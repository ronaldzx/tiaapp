import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Form from './componentes/Form';
import './App.css';
import Home from './Home';
import Header from './componentes/Header';
import Consultas from './componentes/Consultas';
import Routes from './Routes';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      appName: "Banana",
      home: false
    }
  }
  render() {
    return (
      <div className="App">
        <Header/>
        <Routes name={this.state.appName}/>
        {/* <Form/> */}
        {/* <Consultas/> */}
      </div>
    );
  }
}

export default App;
