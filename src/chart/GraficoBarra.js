import React, { Component } from 'react';
import { Bar, Line, Pie, Polar } from 'react-chartjs-2';
import { GetData } from '../api/GetData';

var year = 2019;
class Graph extends Component {
    constructor() {
        super();

        this.state = {
            labels: [],
            years: [],
            labelsmensual:[],
            redirect: false
        }

        this.mostarDefecto();
        this.mostrarYear();
        this.mostrarMensual();
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
        GetData('graficoDefecto').then((result) => {
            this.setState({
                labels: result
            });
        });
    }
    mostrarYear() {
        GetData('yearsSellOut').then((result) => {
            this.setState({
                years: result
            });
        });
    }
    mostrarMensual() {
        GetData('MensualSellOut').then((result) => {
            this.setState({
                labelsmensual: result
            });
        });
    }    
    render() {
        var label = this.state.labels.map((props, index) => {
            return props.Cliente
        })
        var dataset = this.state.labels.map((props, index) => {
            return props.Importe
        })
        var datamensual = this.state.labelsmensual.map((props)=>{
            return props.Importe
        })
        var data = {
            labels: label,
            datasets: [{
                label: 2019,
                data: dataset,
                backgroundColor: ['rgba(16, 221, 208, 0.6)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)']
            },
            {
                label: 2018,
                data: datamensual,
                backgroundColor: ['rgba(16, 221, 208, 0.6)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)']
            }],
            fontSize: 12

        }
        return (
            <div>
                <div className="filtro-bar">
                    <div class="content bar">
                        <div class="year-content">
                            <span>Seleccionar año: </span>
                            <select>
                                <option>Seleccionar Año</option>
                                {this.state.years.map((props) => {
                                    return (
                                        <option>{props.year}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div class="month-content">
                            <span>Seleccionar Periodo: </span>
                            <select>
                                <option>Seleccionar Periodo</option>
                                <option>Mensual</option>
                                <option>Bimestral</option>
                                <option>Trimestral</option>
                                <option>Anual</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="container-graph">
                    <div key={1} className="chart-container">
                        <div className="wrapper">
                            <div>
                                <Bar data={data}

                                    options={{
                                        title: {
                                            display: true,
                                            text: 'ESTADO ACTUAL',
                                            fontSize: 12
                                        },
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                },

                                            }]
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Graph;