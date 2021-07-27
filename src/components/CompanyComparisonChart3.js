import React, { Component } from 'react';
// import './App.css';
// import Chart from './charts';

import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Button, Form } from 'react-bootstrap';
import { deployhost2, deployhost } from './deploylink';


import { Switch, HashRouter, Router, Route, Link } from "react-router-dom";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


let chartConfigs = {
    type: 'msline',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        chart: {
            "caption": "Company-wise Comparison of Share Price",
            // "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Time Period",
            "yAxisName": "Share Price of Company",
            "numberPrefix": "₹",
            "theme": "fusion"
        },
        categories: [
            {
                category: [
                    {
                        label: ""
                    }
                ]
            }
        ],
        dataset: [
            {
                seriesname: "",
                data: [
                    {
                        value: ""
                    }
                ]
            }
        ]
    }
};

let i = 0;
let nancase = false;

class CompanyComparisonChart3 extends Component {



    constructor(props) {

        super(props);
        this.state = chartConfigs;

        this.dosearch = this.dosearch.bind(this);
        // this.state.dataSource.data = []
    }


    dosearch() {
        // i += 1;
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
                'Vary': 'Origin',
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({ "companyName": company1, "start": startdate, "end": enddate })
        };


        // console.log(searchval);
        // let data = [];
        let endpoint = `${deployhost2}/getCompanyStockPriceInRange`;
        //you need to give end slash ony if you call from rest endpoint
        fetch(endpoint, myInit1)

            .then(response => {
                // response = response.filter(ele => ele.exchangename === searchval2)
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
                // company1prices = response;
                var prevDs = Object.assign({}, this.state.dataSource);
                response.forEach((value, key) => {
                    prevDs.categories[0].category[key] = {
                        'label': 'Ayush',
                    };
                })
                let arr = [];

                response.forEach((value, key) => {
                    arr.push({ "value": response[key] })
                })
                console.log(arr);

                prevDs.dataset[i] = {
                    'seriesname': company1,
                    'data': arr
                }
                this.setState({
                    dataSource: prevDs,
                });
                i += 1;
                console.log(prevDs);
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
                            <h3>Multiple Companies over a Specific Period</h3>
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


                            {/* {chartConfigs.Chart} */}
                        </div>
                        <br></br>
                        <ReactFC {...chartConfigs} />


                    </div>

                </div>

            );
    }
}

export default CompanyComparisonChart3;