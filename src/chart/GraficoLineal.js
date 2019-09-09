import React, { Component } from 'react';
import { HorizontalBar, Bar, Line, Pie, Polar } from 'react-chartjs-2';
import { GetData } from '../api/GetData';
import { PostData } from '../api/PostData';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
class GraficoLineal extends Component {
    constructor() {
        super();
        this.state = {
            usuario: 0,
            grafico1: [],
            redirect: false
        }
        this.mostarDefecto();
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
    mostarDefecto() {
        GetData('graficoLinealDefecto').then((result) => {
            this.setState({
                grafico1: result
            });
        });
    }
    render() {
        var label = this.state.grafico1.map((props) => {
            return props.RefTiempo
        })
        var dataset = this.state.grafico1.map((props) => {
            return props.TotalVendido
        })
        var data = {
            labels: label,
            datasets: [{
                label: 'IMPORTE',
                fill: false,
                data: dataset,
                backgroundColor: 'rgb(25, 100, 86)'
            }], fontSize: 12
        }
        var label3 = this.state.grafico1.map((props) => {
            return props.RefTiempo
        })
        var dataset3 = this.state.grafico1.map((props) => {
            return props.TotalVendido
        })
        var data3 = {
            labels: label3,
            datasets: [{
                label: 'IMPORTE',
                fill: false,
                data: dataset3,
                backgroundColor: 'rgb(25, 100, 86)'
            }], fontSize: 12
        }
        return (
            <div>
                <div className="container-graph">
                    <div className="gridLineal">
                        <div className="item1">
                            <div className="chart-container">
                                <Line data={data}
                                    options={{
                                        responsive: true,
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
                        <div className="item2">
                            <div className="chart-container">
                                <Line data={data}
                                    options={{
                                        responsive: true,
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
                        <div className="item3">
                            <div className="chart-container">
                                <HorizontalBar data={data3}
                                    options={{
                                        responsive: true,
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
                        <div className="item4">
                            <div >
                                <Link to={'./Home'}>
                                    <button type="button" className='btn btn-success'>Regresar al Inicio</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
export default GraficoLineal;