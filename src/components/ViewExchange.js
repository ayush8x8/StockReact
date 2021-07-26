import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css';

function ViewExchange() {

    const [exchanges, setExchanges] = useState([]);
    const [exchangeName, setexchangeName] = useState('');
    const [companies, setcompanies] = useState([]);


    const [showForm, setShowForm] = useState(false);
    const [showTable, setshowTable] = useState(false);

    const sshowForm = () => {
        setShowForm(!showForm);
        setshowTable(false);
        setexchangeName('')
    }



    const GET_EXCHANGES_API = 'http://localhost:8084/getStockExchanges';
    async function GetExchangesApi() {
        const res = await fetch(GET_EXCHANGES_API, {
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
        GetExchangesApi().then((data) => {
            setExchanges(data);
            console.log(data);

        });
    }, [])

    async function SearchForCompaniesApi(exchangeName) {
        const res = await fetch(`http://localhost:8084/getCompanyByExchange?exchangeName=${exchangeName}`, {
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
        if (!exchangeName) {
            alert('Please fill the details')
            return
        }

        // sshowForm3();

        SearchForCompaniesApi(exchangeName).then((data) => {

            setcompanies(data);
            console.log(data);

            alert('Results updated');
        });

        // setcompanyName('')
    }

    return (
        <Container>
            <br></br>
                <h3>List of Exchanges:</h3>
<br></br>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EXCHANGE NAME</th>
                            <th>EXCHANGE BRIEF</th>
                            <th>ADDRESS</th>
                            <th>REMARKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(
                            exchanges.map(exchange =>
                                <tr key={exchange.id}>
                                    <td>{exchange.id}</td>
                                    <td>{exchange.name}</td>
                                    <td>{exchange.brief}</td>
                                    <td>{exchange.address}</td>
                                    <td>{exchange.remarks}</td>
                                </tr>
                            )
                        )
                        }
                    </tbody>
                </Table>
                <br /><br />

                <Button variant="outline-secondary" onClick={sshowForm} >View Companies Listed</Button>

                {showForm && (
                    <Form onSubmit={onSearchForCompanies}>
                        <Form.Group className="mb-3">
                            <br></br>
                            <Form.Label>Exchange Name : </Form.Label>
                            <Form.Control type="text"
                                value={exchangeName}
                                onChange={(e) => setexchangeName(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                    </Form>
                )}

                <br /><br />

                {showTable && (<Table bordered striped hover >
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
            
        </Container>
    )
}

export default ViewExchange
