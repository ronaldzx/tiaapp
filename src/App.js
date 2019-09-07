import React, { Component } from 'react';
import './App.css';
import Header from './componentes/Header';
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
