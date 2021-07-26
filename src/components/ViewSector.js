import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css';
import ComparisonCharts from './ComparisonCharts';
import SectorComparisonChart2 from './SectorComparisonChart2';

function ViewSector() {

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


    const [showForm, setShowForm] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [sectorName, setsectorName] = useState('');
    const [companies, setcompanies] = useState([]);
    const [showTable, setshowTable] = useState(false);


    const [single, setsingle] = useState(false);

    const sshowForm = () => {
        setsingle(false);
        setShowForm(!showForm);
        GetSectorsApi().then((data) => {
            setSectors(data);
            console.log(data);

        });
        setsectorName('');
    }

    const sshowForm2 = () => {
        setShowForm2(!showForm2);
        setshowTable(false);
    }

    const [sectors, setSectors] = useState([]);
    const [sector, setsector] = useState({});

    const GET_SECTORS_API = 'http://localhost:8084/getSectors';
    async function GetSectorsApi() {
        const res = await fetch(GET_SECTORS_API, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            }
        });
        return res.json();
    }

    useEffect(() => {
        GetSectorsApi().then((data) => {
            setSectors(data);
            console.log(data);

        });
    }, [])

    async function SearchBySectorNameApi(sectorName) {
        const res = await fetch(`http://localhost:8084/getSectorByName?sectorName=${sectorName}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        });
        return res.json();
    }

    const onSearchBySectorName = (e) => {

        e.preventDefault()
        setsingle(true);
        if (!sectorName) {
            alert('Please fill the details')
            return
        }

        // sshowForm();

        SearchBySectorNameApi(sectorName).then((data) => {

            setsector(data);
            console.log(data);


        });

        // setsectorName('');
    }

    async function SearchForCompaniesApi(sectorName) {
        const res = await fetch(`http://localhost:8084/getCompaniesInSector?sectorName=${sectorName}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            }
        });
        return res.json();
    }

    const onSearchForCompanies = (e) => {

        e.preventDefault();
        setshowTable(true);
        if (!sectorName) {
            alert('Please fill the details')
            return
        }

        // sshowForm3();

        SearchForCompaniesApi(sectorName).then((data) => {

            setcompanies(data);
            console.log(data);

        });

        // setcompanyName('')
    }

    return (
        <Container>
            <br></br>
            <h3>List of Sectors:</h3>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>SECTOR NAME</th>
                        <th>SECTOR BRIEF</th>
                    </tr>
                </thead>
                <tbody>
                    {!single ? (
                        sectors.map(sector =>
                            <tr key={sector.id}>
                                <td>{sector.id}</td>
                                <td>{sector.sectorName}</td>
                                <td>{sector.brief}</td>
                            </tr>
                        )
                    ) : (
                        <tr key={sector.id}>
                            <td>{sector.id}</td>
                            <td>{sector.sectorName}</td>
                            <td>{sector.brief}</td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>

            <br /><br />

            <Button variant="outline-secondary" onClick={sshowForm} >View Specific Sector Details</Button>

            {showForm && (
                <Form onSubmit={onSearchBySectorName}>
                    <Form.Group className="mb-3">
                        <br></br>
                        <Form.Label>Sector Name : </Form.Label>
                        <Form.Control type="text"
                            value={sectorName}
                            onChange={(e) => setsectorName(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                </Form>
            )}

            <br /><br />

            <Button variant="outline-secondary" onClick={sshowForm2} >View Companies In Sector</Button>

            {showForm2 && (
                <Form onSubmit={onSearchForCompanies}>
                    <Form.Group className="mb-3">
                        <br></br>
                        <Form.Label>Sector Name : </Form.Label>
                        <Form.Control type="text"
                            value={sectorName}
                            onChange={(e) => setsectorName(e.target.value)} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                </Form>
            )}

            <br /><br />

            {showTable && (<Table bordered striped hover>
                <thead>
                    <tr>
                        <th>COMPANIES</th>
                    </tr>
                </thead>
                <tbody>
                    {(
                        companies.map((company, index) =>
                            <tr key={index}>
                                <td>{company}</td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </Table>
            )
            }
            <br /><br />
            

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
                            Multiple Sectors in Same Time Period
                        </Button>
                        {togglechart1 && (<div>
                            <ComparisonCharts />
                        </div>)}
                    </div>
                    <br></br>
                    <div>
                        <Button variant="outline-secondary" onClick={ssettogglechart2}>
                            Same Sector in Different Time Period
                        </Button>
                        {togglechart2 && (
                            <div>
                                <SectorComparisonChart2 />
                            </div>
                        )
                        }
                    </div>
                </div>
            )}
            
            
        </Container>
    )
}

export default ViewSector
