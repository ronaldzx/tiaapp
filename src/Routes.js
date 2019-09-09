import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';
import GraficoBarra from './chart/GraficoBarra';
import Home from './Home';
import GraficoLineal from './chart/GraficoLineal';
import Consultas from './componentes/Consultas';
import Form from './componentes/Form';
import Login from './Login';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          {/* <Route exact path="/" component={Welcome}/> */}
          <Route exact path="/" component={Login}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Consultas" component={Consultas}/>
          <Route path="/Form" component={Form}/>
          <Route path="/GraficoBarra" component={GraficoBarra}/>
          <Route path="/GraficoLineal" component={GraficoLineal}/>
          {/* <Route path="/App" component={App}/> */}
          <Route path="*" component={Login}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;