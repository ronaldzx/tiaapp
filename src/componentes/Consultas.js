import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Form from './Form';
import Home from '../Home';
var auxId = 0;
var auxValor = 0;
var datos = {
    idProducto: [],
    fValor: []
};
class Consultas extends Component {
    constructor() {
        super();
        this.contentEditable = React.createRef();
        this.state = ({
            dbBoleta: [],
            dbFactura: [],
            dbFacturacion: [],
            dbProductos: [],
            dbDespachoMultiple: [],
            iCantidad: 0,
            cValue:'',
            cliente : '',
            cTipoDoc:'',
            colorBoleta:'',
            colorFactura:'',
            colorFacturacion:'',
            datos: {
                idProducto: [],
                fValor: []
            }
        });

        this.mostrarOrdensExpress();
        this.mostrarOrdensExpressBoleta();
        this.mostrarOrdensExpressFacturacion();
        this.mostrarOrdensExpressDespachoMultiple();
        //this.handleChange = this.handleChange.bind(this);
        this.mostrarOrdensExpress = this.mostrarOrdensExpress.bind(this);
        this.mostrarOrdensExpressBoleta = this.mostrarOrdensExpressBoleta.bind(this);
        this.mostrarOrdensExpressFacturacion = this.mostrarOrdensExpressFacturacion.bind(this);
        this.mostrarOrdensExpressDespachoMultiple = this.mostrarOrdensExpressDespachoMultiple.bind(this);
        this.volverTotal = this.volverTotal.bind(this);
        this.getId = this.getId.bind(this);
        this.enviar = this.enviar.bind(this);
        //this.ingresarDatos= this.ingresarDatos.bind(this)
    }
    // handleChange = evt => {
    //     this.setState({ html: evt.target.value });
    // };
    enviar(e) {
        e.preventDefault();
        console.log(e.target.id);
        console.log(this.state.datos.fValor);
    }    
    ingresarDatos(id) {
        var Formulario = new FormData(document.getElementById('formulario'));
        var fSalen = Formulario.get(id);
        fetch('/api/insertarConsultas', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                salen: fSalen
            })
        });
        const data = (async () => {
            const rawResponse = await fetch('/api/productosSalida', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    codigoDocumento: Formulario.get(this.state.cTipoDoc)
                })
            });
            const content = await rawResponse.json();
            this.setState({
                dbProductos: content
            })
        })();
        console.log('ID PRODUCTO: ', id, 'fSalen: ', fSalen, ' tipodoc: ',this.state.cTipoDoc)
    }
    getId(e) {
        auxId = 0;
        auxValor = 0;
        if (e.target.id != auxId && e.target.value === auxValor) {

        }
        this.state.datos.idProducto.push(e.target.id)
        this.state.datos.fValor.push(e.target.value)
        this.setState({
            datos: { idProducto: e.target.id, fValor: e.target.value }
        })
        // datos.idProducto=e.target.id;
        // datos.fValor=e.target.value;
        // console.log('datos: ',datos.idProducto);
        // console.log('valor: ',datos.fValor);
    }
    mostrarOrdensExpress() {
        fetch('/api/productosFiltradoSalidaFactura')
            .then((response) => response.json())
            .then((dbFactura) => {
                this.setState({
                    dbFactura
                }, () => console.log('fetchea4 ', dbFactura));
            });
    }
    mostrarOrdensExpressBoleta() {
        fetch('/api/productosFiltradoSalidaBoleta')
            .then((response) => response.json())
            .then((dbBoleta) => {
                this.setState({
                    dbBoleta
                }, () => console.log('fetchea4 ', dbBoleta));
            });
    }
    mostrarOrdensExpressFacturacion() {
        fetch('/api/productosFiltradoSalidaFacturacion')
            .then((response) => response.json())
            .then((dbFacturacion) => {
                this.setState({
                    dbFacturacion
                }, () => console.log('fetchea4 ', dbFacturacion));
            });
    }
    mostrarOrdensExpressDespachoMultiple() {
        fetch('/api/productosFiltradoSalidaDespachoMultiple')
            .then((response) => response.json())
            .then((dbDespachoMultiple) => {
                this.setState({
                    dbDespachoMultiple
                }, () => console.log('fetchea5 ', dbDespachoMultiple));
            });
    }    
    async volverTotal(event) { // esto me regresa el total a 0 // esto se llama en el evento OnChange del combobox
        const bas = event.target.value;
        this.setState({
            cTipoDoc:event.target.name
        })
        const data = (async () => {
            const rawResponse = await fetch('/api/productosSalida', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    codigoDocumento: bas
                })
            });
            const content = await rawResponse.json();
            this.setState({
                dbProductos: content
            })
            this.state.dbProductos.map((props) => {
                this.setState({ cliente: props.prosal_iCliente })
                this.setState({ sku: props.prosal_vcProducto })
            })
            console.log('gaa', this.state.dbProductos)
        })();
        // this.setState({ total: 0 });
        // this.setState({ producto: '' })
        // this.setState({ viaje: 0 })
        // this.setState({ quantity: 0 })
    }
    handleInput(event) {

    }
    render() {
        const Consultas = () => (
            <Switch>
                <Route path='/Form' component={Form} />
            </Switch>
        )
        return (
            <div className="container-fluid">
                <div id='form' className="container d-flex mt-4 pb-5 ">
                    <div className="container mt-5 ml-4">
                        <form id="formulario" name="form" className="container">
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="factura" name="factura" className={"custom-select "+this.state.colorFactura} onChange={this.volverTotal}>
                                        <option>Seleccionar Factura</option>
                                        {this.state.dbFactura.map((props) => {
                                            return (
                                                <option>{props.prosal_vcDocumento}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="boleta" name="boleta" className={"custom-select "+this.state.colorBoleta} onChange={this.volverTotal}>
                                        <option>Seleccionar Boleta</option>
                                        {this.state.dbBoleta.map((props) => {
                                            return (
                                                <option>{props.prosal_vcDocumento}</option>
                                            )
                                        })}                                        
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="ordenfactura" name="ordenfactura" className={"custom-select "+this.state.colorFacturacion} onChange={this.volverTotal}>
                                        <option>Seleccionar Orden Factura</option>
                                        {this.state.dbFacturacion.map((props) => {
                                            return (
                                                <option>{props.prosal_vcDocumento}</option>
                                            )
                                        })}                                        
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="ordenfactura" name="ordenfactura" className={"custom-select "+this.state.colorFacturacion} onChange={this.volverTotal}>
                                        <option>Seleccionar Despacho Múltiple</option>
                                        {this.state.dbDespachoMultiple.map((props) => {
                                            return (
                                                <option>{props.prosal_vcDocumento}</option>
                                            )
                                        })}                                        
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-1">CLIENTE:</div>
                                <div className="col-4">
                                    <input
                                        type="text"
                                        id="disabledTextInput"
                                        name="cliente"
                                        className="form-control"
                                        disabled
                                        value={this.state.cliente} />
                                </div>
                            </div>
                            {this.state.dbProductos.map((props) => {
                                if (props.prosal_fSaldo > 0) {
                                    var check = 'check';
                                    var icono = 'fas fa-check';
                                } else {
                                    check = '';
                                    icono = '';
                                }
                                return (
                                    <div>
                                        <div className="row justify-content-start mt-4 ">
                                            <div className="col-2 ajuste-font12">
                                                {props.prosal_vcProducto}
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>U.M.:</span>
                                            </div>
                                            <div className="col-1 ajuste-font12">
                                                {props.prosal_vcMedida}
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>CANT:</span>
                                            </div>
                                            <div className="col-1">
                                                <span>{props.prosal_fCantidad}</span>
                                            </div>
                                            <div className="col-1">
                                                <span className={check}>
                                                    <i class={icono}></i>
                                                </span>

                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>SALEN:</span>
                                            </div>
                                            <div className="col-1">
                                                <input
                                                    key={props.prosal_iId}
                                                    type="tel"
                                                    id={props.prosal_iId}
                                                    name={props.prosal_iId}
                                                    className="form-control ajuste-font12"
                                                    on={this.getId}
                                                />
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>SALDO:</span>
                                            </div>
                                            <div className="col-1">
                                                {props.prosal_fSaldo}
                                            </div>
                                            <div className="col-1">
                                                <button type="button" onClick={this.ingresarDatos.bind(this, props.prosal_iId)} className='btn btn-info' >Ingresar</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {/* <div class="row justify-content-start mt-4">
                                <div className="col">
                                    <button type="button" onClick={this.enviar} className='btn btn-info'>Confirmar Ingreso de orden</button>
                                </div>
                            </div> */}
                            <div className="row mt-5">
                                <div className="col">
                                    <a href="/Home">Regresar Al inicio</a>
                                    {/* <Link to={'./Home'}>
                                        <button type="button" className='btn btn-success'>Regresar al Inicio</button>
                                    </Link> */}
                                </div>
                            </div>
                            {/* <div>
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">SKU</th>
                                            <th scope="col">U.M</th>
                                            <th scope="col">ESTADO</th>
                                            <th scope="col">SALEN</th>
                                            <th scope="col">SALDO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.dbProductos.map((props, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td className="contenteditable=true">{props.prosal_vcProducto}</td>
                                                    <td>{props.prosal_vcMedida}</td>
                                                    <td>0</td>
                                                    <td><ContentEditable
                                                        innerRef={this.contentEditable}
                                                        html={this.state.html}
                                                        disabled={false}
                                                        onChange={this.handleChange}
                                                        tagName='article'
                                                    /></td>
                                                    <td>0</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default Consultas;
