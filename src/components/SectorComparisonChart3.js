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

class SectorComparisonChart3 extends Component {



    constructor(props) {

        super(props);
        this.state = chartConfigs;
        
        this.dosearch = this.dosearch.bind(this);
        
        this.state.dataSource.data = []
    }


    dosearch() {

        let sector1 = this.refs.sector1.value;//get node value or text value
        let company1 = this.refs.company1.value;
        let startdate = this.refs.startdate.value;
        let enddate = this.refs.enddate.value;
        let sector1price;
        let company1price;


        const myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin',
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({ "sectorName": sector1, "start": startdate, "end": enddate })
        };

        const myInit2 = {
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
        let data = [];
        let endpoint = `${deployhost2}/getSectorPriceInRange`;
        let endpoint2 = `${deployhost2}/getCompanyStockPriceInRange`;
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
                
                this.setState({
                    dataSource: prevDs,
                });
                //     console.log('data' + JSON.stringify(data));
                // });
                // console.log('this.' + data);
                // console.log('chart' + JSON.stringify(chartConfigs));
            })//endo of .then line 53	

            fetch(endpoint2, myInit2)

            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);//real print of array
                company1price = response;
                var prevDs = Object.assign({}, this.state.dataSource);
                prevDs.data[i++] = {
                    'label': company1,
                    'value': company1price
                }
                
                this.setState({
                    dataSource: prevDs,
                });
                //     console.log('data' + JSON.stringify(data));
                // });
                // console.log('this.' + data);
                // console.log('chart' + JSON.stringify(chartConfigs));
            })

    }



    render() {
        return (
            <div className="App">



                
                    <Form>
                        <br></br>
                        <br></br>
                        <h3>Company vs Sector in a Specific Period</h3>
                        <br></br>
                        <Form.Group className="mb-3">
                            <input type="text" className="form-control" placeholder="Company Name" ref='company1' />
                        </Form.Group>
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

export default SectorComparisonChart3;