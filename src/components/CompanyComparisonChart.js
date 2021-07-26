import React, { Component } from 'react';
// import './App.css';
// import Chart from './charts';

import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


let chartConfigs = {
    type: 'line',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Company-wise Comparison of Share Price",
            // "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Time Period",
            "yAxisName": "Share Price of Company",
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
let nancase = false;

class CompanyComparisonChart extends Component {



    constructor(props) {

        super(props);
        this.state = chartConfigs;

        this.dosearch = this.dosearch.bind(this);
        this.state.dataSource.data = []
    }


    dosearch() {

        let company1 = this.refs.company1.value;//get node value or text value
        // let company2 = this.refs.company2.value;
        let startdate = this.refs.startdate.value;
        let enddate = this.refs.enddate.value;
        let company1prices = [];

        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify({ "companyName": company1, "start": startdate, "end": enddate })
        };


        // console.log(searchval);
        let data = [];
        let endpoint = 'http://127.0.0.1:8084/getCompanyStockPriceInRange';
        //you need to give end slash ony if you call from rest endpoint
        fetch(endpoint, myInit1)

            .then(response => {
                // if (isNaN(response)) {
                //     alert('Inadequate Data in this period!');
                //     nancase = true;
                //     return;
                // }
                // else {
                return response.json();
                // }

            })
            .then(response => {
                console.log(response);//real print of array
                company1prices = response;
                var prevDs = Object.assign({}, this.state.dataSource);
                // prevDs.data[i++] = {
                //     'label': company1,
                //     'value': company1prices
                // }
                response.forEach((value, key) => {
                    //		data[key] = {
                    prevDs.data[key] = {
                        'label': company1,
                        'value': response[key]
                    };
                    this.setState({
                        dataSource: prevDs,
                    });
                    //     console.log('data' + JSON.stringify(data));
                });
                // console.log('this.' + data);
                // console.log('chart' + JSON.stringify(chartConfigs));
            })//endo of .then line 53	

    }




    render() {
        if (nancase) {
            return (
                <h3>Inadequate Data in this period!</h3>
            );
        }
        else
            return (
                <div>
                    <div className="App">
                        <br></br>
                        <br></br>
                        <div>
                            <h4>Same Company in Different Time Periods</h4>
                            <br></br>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" className="form-control" placeholder="Company Name" ref='company1' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="date" className="form-control" ref='startdate' />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="date" className="form-control" placeholder="End Date 1" ref='enddate' />
                                </Form.Group>
                                <Button variant="outline-success" type="button" onClick={this.dosearch}>Go</Button>
                            </Form>

                            {chartConfigs.Chart}
                        </div>
                        <br>
                        </br>
                        <ReactFC {...chartConfigs} />


                    </div>

                </div>

            )
    }
}

export default CompanyComparisonChart;