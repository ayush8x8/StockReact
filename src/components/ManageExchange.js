import React, { useState } from 'react';
import { useEffect } from 'react';
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

    async function AddExchangeApi() {
        const res = await fetch('http://localhost:8084/addStockExchange', {
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
            alert('Exchange added successfully');
            console.log(data);
        });

        setexchangeName('')
        setexchangeBrief('')
        setaddress('')
        setremarks('')
    }

    return (
        <div>
            <center>
                <h3>List of Exchanges</h3>
                <table>
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
                </table>
                <br /><br />
                <button onClick={sshowForm} >Add New Exchange</button>

                {showForm && (
                    <form onSubmit={onSubmitExchange}>
                        <p>
                            <label>Exchange Name : </label>
                            <input type="text"
                                value={exchangeName}
                                onChange={(e) => setexchangeName(e.target.value)} />
                        </p>
                        <p>
                            <label>Exchange Brief : </label>
                            <input type="text" value={exchangeBrief}
                                onChange={(e) => setexchangeBrief(e.target.value)} />
                        </p>
                        <p>
                            <label>Address : </label>
                            <input type="text" value={address}
                                onChange={(e) => setaddress(e.target.value)} />
                        </p>
                        <p>
                            <label>Remarks : </label>
                            <input type="text" value={remarks}
                                onChange={(e) => setremarks(e.target.value)} />
                        </p>
                        <input type='submit' value='Add New Exchange' />
                    </form>
                )}
            </center>
        </div>
    )
}

export default ManageExchange
