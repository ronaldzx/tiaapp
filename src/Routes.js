import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import App from './App';
import Home from './Home';
import Header from './componentes/Header';
import Consultas from './componentes/Consultas';
import Form from './componentes/Form';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Consultas" component={Consultas}/>
          <Route path="/Form" component={Form}/>
          <Route path="/App" component={App}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;