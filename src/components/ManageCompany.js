import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css';

function ManageCompany() {

    const [showForm, setShowForm] = useState(false);
    const [showExForm, setShowExForm] = useState(false);

    const [update, setUpdate] = useState(false);

    const sshowForm = () => {
        setShowForm(!showForm);
    }

    const sshowExForm = () => {
        setShowExForm(!showExForm);
        setcompanyName('');
        setexchangeName('');
    }

    const [companies, setCompanies] = useState([]);
    const [exchangesofcompany, setexchangesofcompany] = useState([]);

    // const GET_EXCHANGESOFCOMPANY_API = `http://localhost:8084/getExchangesOfCompany/${companyName}`;
    // async function GetExchangesOfCompanyApi() {
    //     const res = await fetch(GET_EXCHANGESOFCOMPANY_API, {
    //         method: 'GET',
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Credentials": true,
    //             "Content-Type": "application/json"
    //         }
    //     });
    //     return res.json();
    // }

    const GET_COMPANIES_API = 'http://localhost:8084/getCompanies';
    async function GetCompaniesApi() {
        const res = await fetch(GET_COMPANIES_API, {
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
        GetCompaniesApi().then((data) => {
            setCompanies(data);
            console.log(data);

        });
        // GetExchangesOfCompanyApi().then((data) => {
        //     setexchangesofcompany(data);
        //     console.log(data);

        // });
    }, [])

    const [id, setid] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [companyBrief, setcompanyBrief] = useState('');
    const [ceo, setceo] = useState('');
    const [boardOfDirectors, setboardOfDirectors] = useState('');
    const [sectorName, setsectorName] = useState('');
    const [turnover, setturnover] = useState('');
    const [exchangeName, setexchangeName] = useState('');

    async function AddCompanyApi() {
        const res = await fetch('http://localhost:8084/addCompany', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "companyName": companyName, "companyBrief": companyBrief, "ceo": ceo, "boardOfDirectors": boardOfDirectors, "sectorName": sectorName, "turnover": turnover })
        });
        return res;
    }

    async function StockExchangeToCompanyApi(exchange_name, company_name) {
        const res = await fetch('http://localhost:8084/mapStockExchangeToCompany', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "company_name": company_name, "exchange_name": exchange_name })
        });
        // alert('Company mapped to exchange!')
        return res;
    }

    async function UpdateCompanyApi() {
        const res = await fetch('http://localhost:8084/updateCompany', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "companyName": companyName, "companyBrief": companyBrief, "ceo": ceo, "boardOfDirectors": boardOfDirectors, "sectorName": sectorName, "turnover": turnover, "id": id })
        });
        return res;
    }

    async function DeleteCompanyApi(companyName) {
        const res = await fetch(`http://localhost:8084/deleteCompanyByName/${companyName}`, {
            method: 'DELETE',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        });
        GetCompaniesApi().then((data) => {
            setCompanies(data);
            console.log(data);

        });
        // alert('Company deleted successfully');
        return res;
    }

    const onUpdateCompany = (e) => {
        e.preventDefault()

        if (!companyName || !companyBrief || !ceo || !boardOfDirectors || !sectorName || !turnover) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        UpdateCompanyApi().then((data) => {
            GetCompaniesApi().then((data) => {
                setCompanies(data);
                console.log(data);

            });
            // alert('Company updated successfully');
            console.log(data);
        });

        setcompanyName('')
        setcompanyBrief('')
        setceo('')
        setboardOfDirectors('')
        setsectorName('')
        setturnover('')
        setUpdate(false);
    }

    const onSubmitCompany = (e) => {
        e.preventDefault()

        if (!companyName || !companyBrief || !ceo || !boardOfDirectors || !sectorName || !turnover) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        AddCompanyApi().then((data) => {
            GetCompaniesApi().then((data) => {
                setCompanies(data);
                console.log(data);

            });
            // alert('Company added successfully');
            console.log(data);
        });

        setcompanyName('')
        setcompanyBrief('')
        setceo('')
        setboardOfDirectors('')
        setsectorName('')
        setturnover('')
    }


    return (
        <Container>
            <br></br>
                <h3>List of Companies:</h3>
                <br></br>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>COMPANY NAME</th>
                            <th>COMPANY BRIEF</th>
                            <th>CEO</th>
                            <th>BOARD OF DIRECTORS</th>
                            <th>SECTOR NAME</th>
                            <th>TURNOVER</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                            {/* <th>EXCHANGES</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            companies.map(company =>
                                <tr key={company.id}>
                                    <td>{company.id}</td>
                                    <td>{company.companyName}</td>
                                    <td>{company.companyBrief}</td>
                                    <td>{company.ceo}</td>
                                    <td>{company.boardOfDirectors}</td>
                                    <td>{company.sectorName}</td>
                                    <td>{company.turnover}</td>
                                    <td><Button variant="outline-secondary" onClick={() => {
                                        sshowForm();
                                        {
                                            setid(company.id);
                                            setcompanyName(company.companyName);
                                            setcompanyBrief(company.companyBrief);
                                            setceo(company.ceo);
                                            setboardOfDirectors(company.boardOfDirectors);
                                            setsectorName(company.sectorName);
                                            setturnover(company.turnover);
                                        }
                                        setUpdate(true);
                                    }}>
                                        Edit</Button></td>
                                    <td><Button variant="outline-secondary" onClick={function () {
                                        DeleteCompanyApi(company.companyName);
                                    }}>Delete</Button></td>
                                    {/* <td>
                                        
                                    </td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <br /><br />

                <Button variant="outline-secondary" onClick={sshowForm} >{update ? "Update Company" : "Add New Company"}</Button>

                {showForm && (
                    <Form onSubmit={update ? onUpdateCompany : onSubmitCompany}>
                        <Form.Group className="mb-3">
                            <br></br>
                            <Form.Label>Company Name : </Form.Label>
                            <Form.Control type="text"
                                value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Brief : </Form.Label>
                            <Form.Control type="text" value={companyBrief}
                                onChange={(e) => setcompanyBrief(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CEO : </Form.Label>
                            <Form.Control type="text" value={ceo}
                                onChange={(e) => setceo(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Board of Directors : </Form.Label>
                            <Form.Control type="text" value={boardOfDirectors}
                                onChange={(e) => setboardOfDirectors(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sector Name : </Form.Label>
                            <Form.Control type="text" value={sectorName}
                                onChange={(e) => setsectorName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Turnover : </Form.Label>
                            <Form.Control type="text" value={turnover}
                                onChange={(e) => setturnover(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" type='submit'>{update ? 'Update Company' : 'Add Company'}</Button>
                    </Form>
                )}
                <br></br>
                <br></br>
                <Button variant="outline-secondary" onClick={sshowExForm}>Add Exchange For Company</Button>
                {showExForm && (
                    <Form onSubmit={() => { StockExchangeToCompanyApi(exchangeName, companyName); sshowExForm(); }}>
                        <Form.Group className="mb-3">
                            <br></br>
                            <Form.Label>Company Name : </Form.Label>
                            <Form.Control type="text" value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Exchange Name : </Form.Label>
                            <Form.Control type="text" value={exchangeName}
                                onChange={(e) => setexchangeName(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" type='submit'>Add</Button>
                    </Form>
                )}
            
        </Container >
    )
}

export default ManageCompany
