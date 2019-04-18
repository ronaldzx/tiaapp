import React, { Component } from 'react';
const Root = "http://" + document.location.hostname + "/tiaapp/src/";
var registred = 0;

function showAction(){
    var id = document.getElementById('registered');
    if(id.style.display ==='block'){
        console.log('existe')
    }
        setTimeout(() => {
            
         }, 1000)
}

function enviarDatos(e){
    var datos =  new FormData(document.getElementById('formulario'))
    var url= Root +"api/prueba.php";
    fetch(url,{
        method :"POST",
        body : datos
    })
    .then( res => res.json())
    .then(response=>{
        console.log(response)
    })
    .catch(function(err){
        console.log('fallo'+err)
    });
}

class Form extends Component {

    constructor(){
        super();
        this.state = ({
          quantity:0,
          color :'secondary',
          text :'Registrar',
          disabled : '',
          products : ['Fideos','Leche','Carne'],
          db: []
        });
        this.mostrarProductos();
        this.handleAdd5 = this.handleAdd5.bind(this);
        this.handleDelete5 = this.handleDelete5.bind(this);  
        this.agregarDatos = this.agregarDatos.bind(this);
        this.eliminarDatos = this.eliminarDatos.bind(this);   
      }

        agregarDatos(){
        this.setState({quantity:Math.abs(this.state.quantity)})
        enviarDatos();
      }
        eliminarDatos(){
        this.setState({quantity:(this.state.quantity*(-1))})
        console.log(this.state.quantity)
        enviarDatos();
      }
      mostrarProductos(){
          return fetch(Root +'api/index.php')
          .then(    (response) => response.json())
          .then((responseJson) =>{
              this.setState({
                  db:responseJson
              });
          })
      }
      handleAdd5(){
          var modulo = 0;
          modulo = this.state.quantity%5;
          if(modulo > 0){
              this.setState({quantity:this.state.quantity+(5-modulo)})
          }else if(modulo === 0){
              this.setState({quantity:this.state.quantity+5})
          }else{
              this.setState({quantity:this.state.quantity-modulo})
          }
      }
      handleDelete5(){
        var modulo = 0;
        modulo = this.state.quantity%5;
        if(this.state.quantity<1){
            this.setState({quantity:0});
        }else
          if (modulo>0){
            this.setState({quantity:this.state.quantity-modulo})
          }else if(modulo === 0){
            this.setState({quantity:this.state.quantity-5})
          }else{ 
            this.setState({quantity:this.state.quantity-(5+modulo)})
          }       
      }

    render(){
        return(
            <div className="container-fluid">
                <div id='form' className="container d-flex mt-4 pb-5 justify-content-md-center">
                    <div className ="content mt-5 ml-4 d-flex">
                        <form id="formulario" name="form">
                            <div className="row">
                                <div className="col">
                                    <button type="button" className='btn btn-secondary btn-lg'>Total 0 registros de {this.state.products[1]}</button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <input 
                                            id ="usuario"
                                            name="usuario" 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ingrese su Usuario"/>
                                     <input 
                                            id ="cantidad"
                                            name="cantidad" 
                                            type="hidden" 
                                            className="form-control" 
                                            placeholder="Ingrese su Usuario"
                                            value ={this.state.quantity}/>
                                </div>
                                <div className="col">
                                    <input 
                                            id="orden"
                                            name="orden" 
                                            type="text" 
                                            className="form-control"
                                            placeholder="Ingrese Orden"/>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                        <select name="descripcion" className="form-control form-control-lg" onChange={this.handleInput}>
                                            {this.state.db.map((props,index) =>{
                                                return(
                                                    <option>{props.descripcion}</option> 
                                                )
                                            })}
                                        </select>
                                </div>
                            </div>    
                            <div className="row mt-3">
                                <div className="col">
                                    <div id="add" className="btn-circle-download" onClick={this.agregarDatos}>
                                        <svg id="arrow" width="90px" height="120px" viewBox="17 14 14 20">
                                            <path d="M24,15 L24,32"></path>
                                            <polyline points="30 27 24 33 18 27"></polyline>
                                        </svg>
                                        <svg id="check" width="90px" height="120px" viewBox="13 17 21 15">
                                            <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
                                        </svg>
                                        <svg  id="border" viewBox="0 0 48 48">
                                            <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col">
                                    <div id="delete" className="btn-circle-download" onClick={this.eliminarDatos}>
                                        <svg id="cross" viewBox="7 -9 14 50">
                                            <polyline points="0,30 30,00"/>
                                            <polyline points="0,0 30,30"/>
                                        </svg>
                                        <svg id="check" viewBox="13 17 21 15">
                                            <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
                                        </svg>
                                        <svg  id="borderc"  viewBox="0 0 48 48">
                                            <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
                                        </svg>
                                    </div>
                                </div>                            
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div id="registered" className="alert alert-success hideDiv">
                                        <strong>Registrados!</strong> Has registrado {registred}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div id="deleted" className="alert alert-danger">
                                        <strong>Eliminados!</strong> Has eliminado {registred} {this.state.db.descripcion}
                                    </div>
                                </div>
                            </div>
                        </form>      
                    </div>
                    <div className="content ml-5 mt-5"> 
                            <div className="row mt-5">
                                <div className="col">
                            
                                </div>
                            </div>                    
                            <div className="row mt-4">
                                <div className="col">
                                    <button type="button" className='btn btn-info'>Seleccionando {this.state.quantity} {this.state.products[1]}</button>
                                </div>
                            </div>
                            <div className="row mt-4">                     
                                <div className="col">
                                    <button type="button" 
                                            className="btn btn-success btn-circle btn-xl btn-df" 
                                            onClick={this.handleAdd5}>
                                            <i class='fas fa-plus'></i>
                                    </button>

                                </div>
                            </div> 
                            <div className="row mt-3">  
                                <div className="col">
                                    <button type="button" 
                                                className="btn btn-danger btn-circle btn-xl btn-df" 
                                                onClick={this.handleDelete5}>
                                                <i class='fas fa-trash'></i>
                                    </button>
                                </div>  
                            </div>                      
                    </div>

                </div>
            </div>
            
        );
    }}

export default Form;
