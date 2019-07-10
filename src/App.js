import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Form from './componentes/Form';
import './App.css';
import Home from './Home';
import Header from './componentes/Header';
import Consultas from './componentes/Consultas';

class App extends Component {
  
  render() {
    const App = () => (
    <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/Home" />
    )} />
    <Route default path='/Home' component={Home} />
    <Route default path='/Form' component={Form} />
    <Route path='/Consultas' component={Consultas} />
    </Switch>
    )
    return (
      <div className="App">
        <Header></Header> 
        <App/>
        {/* <Form/> */}
        {/* <Consultas/> */}
      </div>
    );
  }
}

export default App;
