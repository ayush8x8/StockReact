import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css';
import CompanyComparisonChart from './CompanyComparisonChart';
import CompanyComparisonChart2 from './CompanyComparisonChart2';
import CompanyComparisonChart3 from './CompanyComparisonChart3';
import { deployhost2, deployhost } from './deploylink';

function ViewCompany() {

    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);
    const [showTable, setshowTable] = useState(false);
    const [togglechart, settogglechart] = useState(false);
    const [togglechart1, settogglechart1] = useState(false);
    const [togglechart2, settogglechart2] = useState(false);

    const ssettogglechart = () => {
        settogglechart(!togglechart);
    }

    const ssettogglechart1 = () => {
        settogglechart1(!togglechart1);
    }

    const ssettogglechart2 = () => {
        settogglechart2(!togglechart2);
    }

    const sshowForm = () => {
        setShowForm(!showForm);
    }

    const sshowForm2 = () => {
        setsingle(false);
        GetCompaniesApi().then((data) => {
            setCompanies(data);
            console.log(data);

        });
        setShowForm2(!showForm2);
    }

    const sshowForm3 = () => {
        setShowForm3(!showForm3);
        setshowTable(false);
        setcompanyName('')
    }

    const [single, setsingle] = useState(false);

    const [companies, setCompanies] = useState([]);
    const [company, setcompany] = useState({});
    const [companyName, setcompanyName] = useState('');
    const [exchanges, setexchanges] = useState([]);


    const GET_COMPANIES_API = `${deployhost2}/getCompanies`;
    async function GetCompaniesApi() {
        const res = await fetch(GET_COMPANIES_API, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    useEffect(() => {
        GetCompaniesApi().then((data) => {
            setCompanies(data);
            console.log(data);

        });
    }, [])


    async function SearchByCompanyNameApi(companyName) {
        const res = await fetch(`${deployhost2}/getCompanyByName?companyName=${companyName}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    async function SearchByMatchNameApi(matchtext) {
        const res = await fetch(`${deployhost2}/getMatchingCompanies?companyName=${matchtext}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    const onSearchByCompanyName = (e) => {

        e.preventDefault()
        setsingle(true);
        if (!companyName) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        SearchByCompanyNameApi(companyName).then((data) => {

            setcompany(data);
            console.log(data);

            // alert('Results updated');
        });

        setcompanyName('')
    }

    function handleChange(matchtext) {

        SearchByMatchNameApi(matchtext).then((data) => {

            setCompanies(data);
            console.log(data);
        });
    }

    async function SearchForExchangesApi(companyName) {
        const res = await fetch(`${deployhost2}/getExchangesOfCompany/${companyName}`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+window.sessionStorage.getItem("token")
            }
        });
        return res.json();
    }

    const onSearchForExchanges = (e) => {

        e.preventDefault();
        setshowTable(true);
        if (!companyName) {
            alert('Please fill the details')
            return
        }

        // sshowForm3();

        SearchForExchangesApi(companyName).then((data) => {

            setexchanges(data);
            console.log(data);

            // alert('Results updated');
        });

        // setcompanyName('')
    }

    return (
        <Container>

            <br></br>
            <h3>List of Companies:</h3>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>COMPANY NAME</th>
                        <th>COMPANY BRIEF</th>
                        <th>CEO</th>
                        <th>BOARD OF DIRECTORS</th>
                        <th>SECTOR NAME</th>
                        <th>TURNOVER</th>
                    </tr>
                </thead>
                <tbody>
                    {!single ? (
                        companies.map(company =>
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.companyName}</td>
                                <td>{company.companyBrief}</td>
                                <td>{company.ceo}</td>
                                <td>{company.boardOfDirectors}</td>
                                <td>{company.sectorName}</td>
                                <td>{company.turnover}</td>
                            </tr>
                        )
                    )
                        : (
                            // <tr>hi</tr>
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.companyName}</td>
                                <td>{company.companyBrief}</td>
                                <td>{company.ceo}</td>
                                <td>{company.boardOfDirectors}</td>
                                <td>{company.sectorName}</td>
                                <td>{company.turnover}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <br /><br />

            <Button variant="outline-secondary" onClick={sshowForm} >View Specific Company Details</Button>

            {showForm && (
                <Form onSubmit={onSearchByCompanyName}>
                    <Form.Group className="mb-3">
                        <br></br>
                        <Form.Label>Company Name : </Form.Label>
                        <Form.Control type="text"
                            value={companyName}
                            onChange={(e) => setcompanyName(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                </Form>
            )}

            <br /><br />

            <Button variant="outline-secondary" onClick={sshowForm2}>Search Matching Companies</Button>

            {showForm2 && (
                <Form>
                    <br></br>
                    <Form.Group className="mb-3">
                        <Form.Label>Input : </Form.Label>
                        <Form.Control type="text"
                            onChange={(e) => handleChange(e.target.value)} />
                    </Form.Group>
                </Form>
            )}

            <br /><br />

            <Button variant="outline-secondary" onClick={sshowForm3} >View Exchanges Listed</Button>

            {showForm3 && (
                <Form onSubmit={onSearchForExchanges}>
                    <Form.Group className="mb-3">
                        <br></br>
                        <Form.Label>Company Name : </Form.Label>
                        <Form.Control type="text"
                            value={companyName}
                            onChange={(e) => setcompanyName(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                </Form>
            )}

            <br /><br />

            {showTable && (<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>EXCHANGE NAMES</th>
                    </tr>
                </thead>
                <tbody>
                    {(
                        exchanges.map((exchange, index) =>
                            <tr key={exchange.index}>
                                <td>{exchange}</td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </Table>
            )
            }

            <br></br>
            <br></br>

            <div className="d-grid gap-2">
                <Button variant="outline-primary" size="lg" onClick={ssettogglechart}>
                    Enable Charting Options
                </Button>
            </div>
            <br></br>
            <br></br>
            <br></br>

            {togglechart && (
                <div>
                    <div>
                        <Button variant="outline-secondary" onClick={ssettogglechart1}>
                            Same Company in Different Time Periods
                        </Button>
                        {togglechart1 && (<div>
                            <CompanyComparisonChart />
                            <CompanyComparisonChart2 />
                        </div>)}
                    </div>
                    <br></br>
                    <div>
                        <Button variant="outline-secondary" onClick={ssettogglechart2}>
                            Multiple Companies over a Specific Period
                        </Button>
                        {togglechart2 && (
                            <div>
                                <CompanyComparisonChart3 />
                            </div>
                        )
                        }
                    </div>
                </div>
            )}

        </Container>
    )
}

export default ViewCompany
