import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
var datos;

function obtenerId (){
    datos = new FormData(document.getElementById('formulario'));
    console.log(datos.get('orden'));    
}

class Consultas extends Component {

    constructor() {
        super();
        this.contentEditable = React.createRef();
        this.state = ({
            db: [],
            dbProductos: [],
            cliente: '',
            sku: [],
            um: '',
            cant: '',
            salen: '',
            saldo: ''

        });
        this.mostrarOrdensExpress();
        //this.handleChange = this.handleChange.bind(this);
        this.mostrarOrdensExpress = this.mostrarOrdensExpress.bind(this);
        this.volverTotal = this.volverTotal.bind(this);
    }
    // handleChange = evt => {
    //     this.setState({ html: evt.target.value });
    // };
    mostrarOrdensExpress() {
        fetch('/api/productosFiltradoSalida')
            .then((response) => response.json())
            .then((db) => {
                this.setState({
                    db
                }, () => console.log('fetchea4 ', db));
            });
    }
    async volverTotal(event) { // esto me regresa el total a 0 // esto se llama en el evento OnChange del combobox
        const bas = event.target.value;
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
                console.log('gaa', this.state.dbProductos)
            })
        })();
        // this.setState({ total: 0 });
        // this.setState({ producto: '' })
        // this.setState({ viaje: 0 })
        // this.setState({ quantity: 0 })
    }
    render() {
        return (
            <div className="container-fluid">
                <div id='form' className="container d-flex mt-4 pb-5 ">
                    <div className="container mt-5 ml-4">
                        <form id="formulario" name="form" className="container">
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="factura" name="factura" className="custom-select" onChange={this.volverTotal}>
                                        <option>Seleccionar Factura</option>
                                        {this.state.db.map((props) => {
                                            return (
                                                <option>{props.prosal_iCodigoDocumento}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="boleta" name="boleta" className="custom-select">
                                        <option>Seleccionar Boleta</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-3">
                                    <select id="ordenfactura" name="ordenfactura" className="custom-select">
                                        <option>Seleccionar Orden Factura</option>
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
                                        disabled />
                                </div>
                            </div>
                            {this.state.dbProductos.map((props) => {
                                return (
                                    <div>
                                        <div className="row justify-content-start mt-4 ">
                                            <div className="col-2 ajuste-font12">
                                                {props.prosal_vcProducto}
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>U.M.:</span>
                                            </div>
                                            <div className="col-2 ajuste-font12">
                                                {props.prosal_vcMedida}
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>CANT:</span>
                                            </div>
                                            <div className="col-1">
                                                <span>{props.prosal_fCantidad}</span>
                                            </div>
                                            <div className="col-1">
                                                <span className="check">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>SALEN:</span>
                                            </div>
                                            <div className="col-1">
                                                <input
                                                    type="text"
                                                    id="disabledTextInput"
                                                    name="salen"
                                                    className="form-control ajuste-font12"
                                                />
                                            </div>
                                            <div className="col-1 ajuste-font12bold">
                                                <span>SALDO:</span>
                                            </div>
                                            <div className="col-1">
                                                {props.prosal_fSaldo}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div class="row justify-content-start mt-4">
                                <div className="col">
                                    <button type="button" className='btn btn-info'>Confirmar Ingreso de orden</button>
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
