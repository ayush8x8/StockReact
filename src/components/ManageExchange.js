import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css'

function ManageExchange() {

    const [showForm, setShowForm] = useState(false);

    const sshowForm = () => {
        setShowForm(!showForm);
    }

    const [exchanges, setExchanges] = useState([]);

    const [id, setid] = useState('');
    const [exchangeName, setexchangeName] = useState('');
    const [exchangeBrief, setexchangeBrief] = useState('');
    const [address, setaddress] = useState('');
    const [remarks, setremarks] = useState('');

    const GET_EXCHANGES_API = 'https://ayushstockmarketspring.herokuapp.com/getStockExchanges';
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

    async function AddExchangeApi() {
        const res = await fetch('https://ayushstockmarketspring.herokuapp.com/addStockExchange', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": exchangeName, "brief": exchangeBrief, "address": address, "remarks": remarks})
        });
        return res;
    }

    const onSubmitExchange = (e) => {
        e.preventDefault()

        if (!exchangeName || !exchangeBrief || !address || !remarks) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        AddExchangeApi().then((data) => {
            GetExchangesApi().then((data) => {
                setExchanges(data);
                // console.log(data.exchangeName);
                console.log(data);
    
            });
            // alert('Exchange added successfully');
            console.log(data);
        });

        setexchangeName('')
        setexchangeBrief('')
        setaddress('')
        setremarks('')
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
                        {
                            exchanges.map(exchange =>
                                <tr key={exchange.id}>
                                    <td>{exchange.id}</td>
                                    <td>{exchange.name}</td>
                                    <td>{exchange.brief}</td>
                                    <td>{exchange.address}</td>
                                    <td>{exchange.remarks}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <br /><br />
                <Button variant="outline-secondary" onClick={sshowForm} >Add New Exchange</Button>

                {showForm && (
                    <Form onSubmit={onSubmitExchange}>
                        <Form.Group className="mb-3">
                            <br></br>
                            <Form.Label>Exchange Name : </Form.Label>
                            <Form.Control type="text"
                                value={exchangeName}
                                onChange={(e) => setexchangeName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Exchange Brief : </Form.Label>
                            <Form.Control type="text" value={exchangeBrief}
                                onChange={(e) => setexchangeBrief(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address : </Form.Label>
                            <Form.Control type="text" value={address}
                                onChange={(e) => setaddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Remarks : </Form.Label>
                            <Form.Control type="text" value={remarks}
                                onChange={(e) => setremarks(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" type='submit'>Add New Exchange</Button>
                    </Form>
                )}
        </Container>
    )
}

export default ManageExchange
