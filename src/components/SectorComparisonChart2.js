import React, { Component } from 'react';
// import './App.css';
// import Chart from './charts';

import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Button, Form } from 'react-bootstrap';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


let chartConfigs = {
    type: 'column2d',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Sector-wise Comparison of Share Price",
            // "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Time Period",
            "yAxisName": "Average Share Price of Companies",
            "numberPrefix": "₹",
            "theme": "fusion"
        },
        // Chart Data
        // {
        //     "label": "MAruti",
        //     "value": "290"
        // }, {
        //     "label": "LG",
        //     "value": "260"
        // }, {
        //     "label": "Nokia",
        //     "value": "180"
        // }
        "data": [

        ]
    },
};

let i = 0;

class ComparisonCharts extends Component {



    constructor(props) {

        super(props);
        this.state = chartConfigs;
        // this.state = chartConfigs2;
        this.dosearch = this.dosearch.bind(this);
        // this.dosearch2 = this.dosearch2.bind(this);
        this.state.dataSource.data = []
    }


    dosearch() {

        let sector1 = this.refs.sector1.value;//get node value or text value
        // let sector2 = this.refs.sector2.value;
        let startdate = this.refs.startdate.value;
        let enddate = this.refs.enddate.value;
        let sector1price;
        let sector2price;


        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify({ "sectorName": sector1, "start": startdate, "end": enddate })
        };

        // const myInit2 = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Vary': 'Origin'
        //     },
        //     body: JSON.stringify({ "sectorName": sector2, "start": startdate, "end": enddate })
        // };

        // console.log(searchval);
        let data = [];
        let endpoint = 'http://127.0.0.1:8084/getSectorPriceInRange';
        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)

            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);//real print of array
                sector1price = response;
                var prevDs = Object.assign({}, this.state.dataSource);
                prevDs.data[i++] = {
                    'label': sector1,
                    'value': sector1price
                }
                // response.forEach((value, key) => {
                //     //		data[key] = {
                //     prevDs.data[key] = {
                //         'label': response[key],
                //         'value': response[key]
                //     };
                this.setState({
                    dataSource: prevDs,
                });
                //     console.log('data' + JSON.stringify(data));
                // });
                // console.log('this.' + data);
                // console.log('chart' + JSON.stringify(chartConfigs));
            })//endo of .then line 53	

    }

    dosearch2() {

        let sector2 = this.refs.sector2.value;//get node value or text value
        // let sector2 = this.refs.sector2.value;
        let startdate2 = this.refs.startdate2.value;
        let enddate2 = this.refs.enddate2.value;
        let sector1price;


        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify({ "sectorName": sector2, "start": startdate2, "end": enddate2 })
        };

        // const myInit2 = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Vary': 'Origin'
        //     },
        //     body: JSON.stringify({ "sectorName": sector2, "start": startdate, "end": enddate })
        // };

        // console.log(searchval);
        let data = [];
        let endpoint = 'http://127.0.0.1:8084/getSectorPriceInRange';
        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)

            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);//real print of array
                sector1price = response;
                var prevDs = Object.assign({}, this.state.dataSource);
                prevDs.data[i++] = {
                    'label': sector2,
                    'value': sector1price
                }
                // response.forEach((value, key) => {
                //     //		data[key] = {
                //     prevDs.data[key] = {
                //         'label': response[key],
                //         'value': response[key]
                //     };
                this.setState({
                    dataSource: prevDs,
                });
                //     console.log('data' + JSON.stringify(data));
                // });
                // console.log('this.' + data);
                // console.log('chart' + JSON.stringify(chartConfigs));
            })//endo of .then line 53	

    }


    render() {
        return (
            <div className="App">



                
                    <Form>
                        <br></br>
                        <br></br>
                        <h3>Same Sector in Different Time Period</h3>
                        <br></br>
                        <Form.Group className="mb-3">
                            <input type="text" className="form-control" placeholder="Sector Name" ref='sector1' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <input type="date" className="form-control" placeholder="Start Date" ref='startdate' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <input type="date" className="form-control" placeholder="End Date" ref='enddate' />
                        </Form.Group>
                        <Button variant="outline-success" type="button" onClick={this.dosearch}>Go</Button>
                    </Form>
                    <br></br>
                    <br></br>

                    {chartConfigs.Chart}
                

                <br></br>
                <br></br>



                <ReactFC {...chartConfigs} />


            </div>
        );
    }
}

export default ComparisonCharts;