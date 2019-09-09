import React, { Component } from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';
import { GetData } from '../api/GetData';
import { PostData } from '../api/PostData';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
class Graph extends Component {
    constructor() {
        super();

        this.state = {
            month: 'M1',
            year: 2019,
            periodo: '%M%',
            labelPeriodo: 'Mensual',
            grafico1: [],
            grafico3: [],
            usuario: 0,
            redirect: false
        }
        this.mostarDefecto3();
        this.mostarDefecto();
        /*this.actualizarMes = this.actualizarMes.bind(this);*/
        this.actualizarPeriodo = this.actualizarPeriodo.bind(this);
        this.actualizarAnio = this.actualizarAnio.bind(this);
    }
    componentDidMount() {
        if (sessionStorage.getItem('responseJson')) {
            console.log('conecta2')
        } else {
            this.setState({ redirect: true })
        }
        let data = JSON.parse(sessionStorage.getItem("responseJson"));
        {
            data.map(props => {
                this.setState({
                    usuario: props.usu_iId
                })
            })
        }
    }
    /*
    actualizarMes(e) {
        this.setState({
            month: e.target.id
        })
        PostData('graficoAnioMes', { month: e.target.id, year: this.state.year }).then((result) => {
            var responseJson = result;
            this.setState({
                grafico1: responseJson
            })
        });
    }
    */
    actualizarAnio(e) {
        this.setState({
            year: e.target.id
        })
        PostData('graficoAnioPeriodo', { periodo: this.state.periodo, year: e.target.id }).then((result) => {
            var responseJson = result;
            this.setState({
                grafico1: responseJson
            })
        });
        PostData('graficoAnioPeriodo3', { periodo: this.state.periodo, year: e.target.id }).then((result) => {
            var responseJson = result;
            this.setState({
                grafico3: responseJson
            })
        });
    }
    actualizarPeriodo(e) {
        this.setState({
            periodo: e.target.id, labelPeriodo: e.target.value
        })
        PostData('graficoAnioPeriodo', { periodo: e.target.id, year: this.state.year }).then((result) => {
            var responseJson = result;
            this.setState({
                grafico1: responseJson
            })
        });
        PostData('graficoAnioPeriodo3', { periodo: e.target.id, year: this.state.year }).then((result) => {
            var responseJson = result;
            this.setState({
                grafico3: responseJson
            })
        });
    }
    mostarDefecto() {
        GetData('graficoDefecto').then((result) => {
            this.setState({
                grafico1: result
            });
        });
    }
    mostarDefecto3() {
        GetData('graficoDefecto3').then((result) => {
            this.setState({
                grafico3: result
            });
        });
    }

    render() {
        var label = this.state.grafico1.map((props) => {
            return props.Cliente
        })
        var dataset = this.state.grafico1.map((props) => {
            return props.Importe
        })

        var data = {
            labels: label,
            datasets: [{
                label: 'IMPORTE',
                data: dataset,
                backgroundColor: 'rgb(25, 100, 86)'
            }
            ],
            fontSize: 12

        }
        var label3 = this.state.grafico3.map((props) => {
            return props.SKU
        })
        var dataset3 = this.state.grafico3.map((props) => {
            return props.CantidadVendida
        })
        var data3 = {
            labels: label3,
            datasets: [{
                label: 'IMPORTE',
                data: dataset3,
                backgroundColor: 'rgb(16, 221, 208)'
            }],
            fontSize: 12

        }
        return (
            <div>
                <div className="container-graph">
                    <div class="wrapper">
                        <div class="item1">
                            <div key={1} className="chart-container">
                                <div>
                                    <Bar data={data}

                                        options={{
                                            title: {
                                                display: true,
                                                text: 'ESTADO ACTUAL: ' + this.state.year + ' - ' + this.state.labelPeriodo,
                                                fontSize: 12
                                            },
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    }

                                                }],
                                                xAxes: [{
                                                    ticks: {
                                                        fontSize: 8
                                                    }
                                                }]
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="item2">
                            <div key={1} className="chart-container">
                                <div>
                                    <Bar data={data}

                                        options={{
                                            title: {
                                                display: true,
                                                text: 'ESTADO ACTUAL: ' + this.state.year + ' - ' + this.state.labelPeriodo,
                                                fontSize: 12
                                            },
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    },

                                                }],
                                                xAxes: [{
                                                    ticks: {
                                                        fontSize: 8
                                                    },

                                                }]
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="item3">
                            <div key={1} className="chart-container">
                                <div>
                                    <Bar data={data3}

                                        options={{
                                            title: {
                                                display: true,
                                                text: 'ESTADO ACTUAL: ' + this.state.year + ' - ' + this.state.labelPeriodo,
                                                fontSize: 11
                                            },
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    },

                                                }],
                                                xAxes: [{
                                                    ticks: {
                                                        fontSize: 9
                                                    },

                                                }]
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="item4">
                            <div className="container">
                                <div className="gridYears">
                                    <span className="yeartitle">
                                        Años
                                    </span>
                                    <button value="2017" id="2017" className="year1" onClick={this.actualizarAnio}>
                                        2017
                                    </button>
                                    <button value="2018" id="2018" className="year2" onClick={this.actualizarAnio}>
                                        2018
                                    </button>
                                    <button value="2019" id="2019" className="year3" onClick={this.actualizarAnio}>
                                        2019
                                    </button>
                                </div>
                                <div className="gridPeriodos">
                                    <span className="periodotitle">
                                        Periodos
                                    </span>
                                    <button value="Mensual" id="%M%" className="periodo1" onClick={this.actualizarPeriodo}>
                                        Mensual
                                    </button>
                                    <button value="Trimestral" id="%T%" className="periodo1" onClick={this.actualizarPeriodo}>
                                        Trimestre
                                    </button>
                                    <button value="Bimestral" id="%B%" className="periodo1" onClick={this.actualizarPeriodo}>
                                        Bimestre
                                    </button>
                                    <button value="Anual" id="%20%" className="periodo1" onClick={this.actualizarPeriodo}>
                                        Anual
                                    </button>
                                </div>
                                <div >
                                    <Link to={'./Home'}>
                                        <button type="button" className='btn btn-success'>Regresar al Inicio</button>
                                    </Link>
                                </div>
                                {/* <div className="gridMonths">
                                    <span className="monthtitle">
                                        Meses
                                    </span>
                                    <button id="M1" className="mes1" onClick={this.actualizarMes}>
                                        Enero
                                    </button>
                                    <button id="M2" className="mes2" onClick={this.actualizarMes}>
                                        Febrero
                                    </button>
                                    <button id="M3" className="mes3" onClick={this.actualizarMes}>
                                        Marzo
                                    </button>
                                    <button id="M4" className="mes4" onClick={this.actualizarMes}>
                                        Abril
                                    </button>
                                    <button id="M5" className="mes5" onClick={this.actualizarMes}>
                                        Mayo
                                    </button>
                                    <button id="M6" className="mes6" onClick={this.actualizarMes}>
                                        Junio
                                    </button>
                                    <button id="M7" className="mes7" onClick={this.actualizarMes}>
                                        Julio
                                    </button>
                                    <button id="M8" className="mes8" onClick={this.actualizarMes}>
                                        Agosto
                                    </button>
                                    <button id="M9" className="mes9" onClick={this.actualizarMes}>
                                        Septiembre
                                    </button>
                                    <button id="M10" className="mes10" onClick={this.actualizarMes}>
                                        Octubre
                                    </button>
                                    <button id="M11" className="mes11" onClick={this.actualizarMes}>
                                        Noviembre
                                    </button>
                                    <button id="M12" className="mes12" onClick={this.actualizarMes}>
                                        Diciembre
                                    </button>
                                </div>
                                    */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Graph;