import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import '../styles/stylesheet.css';

function ViewIpo() {

    const [showForm, setShowForm] = useState(false);
    const sshowForm = () => {
        setShowForm(!showForm);
    }

    const [ipos, setipos] = useState([]);

    const GET_IPOS_API = 'http://localhost:8084/getIPOs';
    async function GetIposApi() {
        const res = await fetch(GET_IPOS_API, {
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
        GetIposApi().then((data) => {
            setipos(data);
            console.log(data);

        });
    }, [])

    const [id, setid] = useState('');
    const [cName, setcName] = useState('');
    const [openDateTime, setopenDateTime] = useState('');
    const [totalNumberOfShares, settotalNumberOfShares] = useState('');
    const [pricePerShare, setpricePerShare] = useState('');
    const [remarks, setremarks] = useState('');

    async function SearchByCompanyApi(cName) {
        const res = await fetch(`http://localhost:8084/getIPOByCompanyName?companyName=${cName}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        });
        return res.json();
    }

    async function SearchChronologicallyApi() {
        const res = await fetch('http://localhost:8084/getIPOChronologically', {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        });
        return res.json();
    }

    const onSearchByCompany = (e) => {
        e.preventDefault()

        if (!cName) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        SearchByCompanyApi(cName).then((data) => {
            
                setipos(data);
                console.log(data);

            // alert('Results updated');
        });

        setcName('')
    }

    const onSearchChronologically = (e) => {

        SearchChronologicallyApi().then((data) => {
            
                setipos(data);
                console.log(data);

            // alert('Results updated');
        });
    }

    return (
        <Container>
            <br></br>
            <h3>List of IPOs:</h3>
            <br></br>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>COMPANY NAME</th>
                            <th>OPEN DATE TIME</th>
                            <th>TOTAL NO OF SHARES</th>
                            <th>PRICE PER SHARE</th>
                            <th>REMARKS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ipos.map(ipo =>
                                <tr key={ipo.id}>
                                    <td>{ipo.id}</td>
                                    <td>{ipo.cName}</td>
                                    <td>{ipo.openDateTime}</td>
                                    <td>{ipo.totalNumberOfShares}</td>
                                    <td>{ipo.pricePerShare}</td>
                                    <td>{ipo.remarks}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>

                <br /><br />

                <Button variant="outline-secondary" onClick={sshowForm} >View IPO by Company Name</Button>

                {showForm && (
                    <Form  onSubmit={onSearchByCompany}>
                       <Form.Group className="mb-3">
                            <br></br>
                            <Form.Label>Company Name : </Form.Label>
                            <Form.Control type="text"
                                value={cName}
                                onChange={(e) => setcName(e.target.value)} />
                        </Form.Group>
                        <Button variant="outline-success" type="submit">
                        Search
                    </Button>
                    </Form>
                )}

                <br /><br />

                <Button variant="outline-success" onClick={onSearchChronologically} >View IPOs Chronologically </Button>

        </Container>
    )
}

export default ViewIpo
