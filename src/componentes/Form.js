import React, { Component } from 'react';
var cantidad = 0;
var total = 0;
var producto = '';
var datos;
var viaje = 0;
var sellIn = 0;
var selected;

function enviarNoDeclarado(event) {
   
    datos = new FormData(document.getElementById('formulario'));
    console.log('opss',selected)
    //datos.append ('cantidad',cantidad);
    fetch('/api/productoNoDeclarado', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            descripcion: selected,
            orden: datos.get('orden'),
            cantidad: cantidad
        })
    })
}

function enviarDatos(event) {
   
    datos = new FormData(document.getElementById('formulario'));
    console.log('opss',selected)
    //datos.append ('cantidad',cantidad);
    fetch('/api/productosFiltrado', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            descripcion: selected,
            orden: datos.get('orden'),
            cantidad: cantidad
        })
    })
}
class Form extends Component {

    constructor() {
        super();
        this.state = ({
            cantidad: cantidad,
            quantity: 0,
            total: total,
            producto: producto,
            color: 'success',
            text: 'Registrado',
            disabled: '',
            viaje: viaje,
            db: [],
            dbFiltrado: [],
            dbSellIn: 0,
            sellIn: 0,
            saldo: 0
        });
        this.mostrarOrdensExpress();
        this.mostrarProductosFiltradoExpress();
        //this.mostrarProductos();
        //this.mostrarProductosFiltrado();
        this.handleAdd5 = this.handleAdd5.bind(this);
        this.handleDelete5 = this.handleDelete5.bind(this);
        this.agregarDatos = this.agregarDatos.bind(this);
        this.eliminarDatos = this.eliminarDatos.bind(this);
        this.volverTotal = this.volverTotal.bind(this);
        this.mostrarProductosFiltradoExpress = this.mostrarProductosFiltradoExpress.bind(this);
        this.agregarDatosNoDeclarado = this.agregarDatosNoDeclarado.bind(this);
        //this.mostrarProductosFiltrado = this.mostrarProductosFiltrado.bind(this);
    }
    mostrarProductosFiltradoExpress() {
        var Formulario = new FormData(document.getElementById('formulario'));
        fetch('/api/productosFiltrado/' + Formulario.get('orden'))
            .then((response) => response.json())
            .then((dbFiltrado) => {
                this.setState({
                    dbFiltrado
                }, () => console.log('fetchea2 ', dbFiltrado));
            });
    }

    mostrarOrdensExpress() {
        fetch('/api/productosFiltrado')
            .then((response) => response.json())
            .then((db) => {
                this.setState({
                    db
                }, () => console.log('fetchea3 ', db));
            });
    }

    async volverTotal(event) { // esto me regresa el total a 0 // esto se llama en el evento OnChange del combobox
        const bas = event.target.value;
        const data = (async () => {
            const rawResponse = await fetch('/api/productosSell', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: bas
                })
            });
            const content = await rawResponse.json();
            this.setState({
                dbSellIn: content
            })
            this.state.dbSellIn.map((props) => {
                this.setState({ sellIn: props.SellIn })
            })
            this.setState({saldo:this.state.sellIn})
            console.log(this.state.saldo)
        })();
        viaje = 0;
        total = 0;
        this.setState({ total: 0 });
        this.setState({ producto: '' })
        this.setState({ viaje: 0 })
        
    }
    agregarDatos(event) {
        cantidad = Math.abs(this.state.quantity);
        var combo = document.getElementById("descripcion");
        selected = combo.options[combo.selectedIndex].text;
        enviarDatos();
        total = total + cantidad; // obtengo la cantidad de productos ingresados y los almaceno en total
        this.setState({ total: total });
        this.setState({ cantidad: cantidad });
        producto = datos.get('descripcion');
        this.setState({ producto: producto });
        this.setState({ text: 'Registrado' });
        this.setState({ color: 'success' });
        viaje = viaje + 1;
        this.setState({ viaje: viaje });
        this.setState({saldo: this.state.saldo - this.state.quantity})
        console.log('cantidad: ',this.state.quantity)
        console.log('a ver: ',this.state.saldo)
    }
    eliminarDatos() {
        cantidad = (Math.abs(this.state.quantity)) * -1;
        total = total + cantidad; // de igual manera acá, pero como es negativo automaticamente lo resta.
        var combo = document.getElementById("descripcion");
        selected = combo.options[combo.selectedIndex].text;
        enviarDatos();
        this.setState({ total: total });
        this.setState({ cantidad: cantidad });
        producto = datos.get('descripcion');
        this.setState({ producto: producto });
        this.setState({ text: 'Eliminado' });
        this.setState({ color: 'danger' });
    }
    agregarDatosNoDeclarado(event) {
        cantidad = Math.abs(this.state.quantity);
        var combo = document.getElementById("descripcion");
        selected = combo.options[combo.selectedIndex].text;
        enviarNoDeclarado();
        total = total + cantidad; // obtengo la cantidad de productos ingresados y los almaceno en total
        this.setState({ total: total });
        this.setState({ cantidad: cantidad });
        producto = datos.get('descripcion');
        this.setState({ producto: producto });
        this.setState({ text: 'Registrado' });
        this.setState({ color: 'success' });
        viaje = viaje + 1;
        this.setState({ viaje: viaje });
        this.setState({saldo: this.state.saldo - this.state.quantity})
        console.log('cantidad: ',this.state.quantity)
        console.log('a ver: ',this.state.saldo)
    }

    handleAdd5() {
        this.setState({ quantity: this.state.quantity + 1 })
        // var modulo = 0;
        // modulo = this.state.quantity % 5;
        // if (modulo > 0) {
        //     this.setState({ quantity: this.state.quantity + (5 - modulo) })
        // } else if (modulo === 0) {
        //     this.setState({ quantity: this.state.quantity + 5 })
        // } else {
        //     this.setState({ quantity: this.state.quantity - modulo })
        // }
    }
    handleDelete5() {
        if (this.state.quantity > 0) {
            this.setState({ quantity: this.state.quantity - 1 })
        }
        // var modulo = 0;
        // modulo = this.state.quantity % 5;
        // if (this.state.quantity < 1) {
        //     this.setState({ quantity: 0 });
        // } else
        //     if (modulo > 0) {
        //         this.setState({ quantity: this.state.quantity - modulo })
        //     } else if (modulo === 0) {
        //         this.setState({ quantity: this.state.quantity - 5 })
        //     } else {
        //         this.setState({ quantity: this.state.quantity - (5 + modulo) })
        //     }
    }

    render() {
        return (
            <div className="container-fluid">
                <div id='form' className="container d-flex mt-4 pb-5 justify-content-md-center">
                    <div className="content mt-5 ml-4 d-flex">
                        <form id="formulario" name="form">
                            <div className="row mt-4">
                                <div className="col-4">
                                    <select id="orden" name="orden" className="form-control" onChange={this.mostrarProductosFiltradoExpress}>
                                        <option>Seleccionar Orden</option>
                                        {this.state.db.map((props, index) => {
                                            return (
                                                <option>{props.Orden}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-8">
                                    <select  id="descripcion" name="descripcion"  className="form-control" onChange={this.volverTotal}>
                                        <option>Seleccionar Producto</option>
                                        {this.state.dbFiltrado.map((props, index) => {
                                            //console.log(props.pro_iId)
                                            return (
                                                <option value={props.pro_iId}>{props.DesIte}</option>
                                            )

                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-4">
                                    <input
                                        type="text"
                                        id="disabledTextInput"
                                        name="sellIn"
                                        className="form-control"
                                        placeholder="sellIn"
                                        value={'SELL IN: ' + this.state.sellIn}
                                        disabled />
                                </div>
                                <div className="col-2">
                                    <button type="button"
                                        className="btn btn-success btn-circle btn-xl btn-df"
                                        onClick={this.handleAdd5}>
                                        <i class='fas fa-plus'></i>
                                    </button>
                                </div>
                                <div className="col-4">
                                    <button type="button" className='btn btn-info'>Seleccionando {this.state.quantity} {this.state.db.id}</button>
                                </div>
                                <div className="col-2">
                                    <button type="button"
                                        className="btn btn-danger btn-circle btn-xl btn-df"
                                        onClick={this.handleDelete5}>
                                        <i class="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-4">
                                    <input
                                        type="text"
                                        id="disabledTextInput"
                                        name="viaje"
                                        className="form-control"
                                        placeholder="viaje"
                                        value={'Número de viaje: ' + this.state.viaje}
                                        disabled />
                                    <div className="row mt-3">
                                        <div className="col">
                                            <input
                                                type="text"
                                                id="disabledTextInput"
                                                name="total"
                                                className="form-control"
                                                placeholder="total"
                                                value={'Total ingresado: ' + this.state.total}
                                                disabled />
                                            <div className="row mt-3">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        id="disabledTextInput"
                                                        name="saldo"
                                                        className="form-control"
                                                        placeholder="SALDO"
                                                        value={'SALDO: ' + this.state.saldo}
                                                        disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div id="add" className="btn-circle-download" onClick={this.agregarDatos}>
                                        <svg id="arrow" width="90px" height="120px" viewBox="17 14 14 20">
                                            <path d="M24,15 L24,32"></path>
                                            <polyline points="30 27 24 33 18 27"></polyline>
                                        </svg>
                                        <svg id="check" width="90px" height="120px" viewBox="13 17 21 15">
                                            <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
                                        </svg>
                                        <svg id="border" viewBox="0 0 48 48">
                                            <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div id="delete" className="btn-circle-download" onClick={this.eliminarDatos}>
                                        <svg id="cross" viewBox="7 -9 14 50">
                                            <polyline points="0,30 30,00" />
                                            <polyline points="0,0 30,30" />
                                        </svg>
                                        <svg id="check" viewBox="13 17 21 15">
                                            <polyline points="32.5 18.5 20 31 14.5 25.5"></polyline>
                                        </svg>
                                        <svg id="borderc" viewBox="0 0 48 48">
                                            <path d="M24,1 L24,1 L24,1 C36.7025492,1 47,11.2974508 47,24 L47,24 L47,24 C47,36.7025492 36.7025492,47 24,47 L24,47 L24,47 C11.2974508,47 1,36.7025492 1,24 L1,24 L1,24 C1,11.2974508 11.2974508,1 24,1 L24,1 Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-4">

                                </div>
                                <div className="col-8">
                                    <button type="button"
                                        className="btn btn-warning btn-circle btn-xl btn-df"
                                        onClick={this.agregarDatosNoDeclarado}>
                                        <i class="fas fa-sign-in-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <div id="registered" className={"alert alert-" + this.state.color}>
                                        <strong>Hecho!</strong> Has {this.state.text} {this.state.cantidad}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    {/*<div className="content ml-5 mt-5">
                        <div className="row mt-5">
                            <div className="col">

                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <button type="button" className='btn btn-info'>Seleccionando {this.state.quantity} {this.state.db.id}</button>
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
                            <div className="col">
                                <button type="button"
                                    className="btn btn-danger btn-circle btn-xl btn-df"
                                    onClick={this.handleDelete5}>
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <button type="button"
                                    className="btn btn-warning btn-circle btn-xl btn-df"
                                    onClick={this.handleAdd5}>
                                    <i class="fas fa-sign-in-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>*/}

                </div>
            </div>

        );
    }
}

export default Form;
