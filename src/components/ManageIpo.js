import React, { useState } from 'react';
import { useEffect } from 'react';
import '../styles/stylesheet.css';

function ManageIpo() {

    const [showForm, setShowForm] = useState(false);
    const sshowForm = () => {
        setShowForm(!showForm);
    }

    const [ipos, setipos] = useState([]);

    const [update, setUpdate] = useState(false);

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

    async function AddIpoApi() {
        const res = await fetch('http://localhost:8084/addIPO', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "cName": cName, "openDateTime": openDateTime, "totalNumberOfShares": totalNumberOfShares, "pricePerShare": pricePerShare, "remarks": remarks })
        });
        return res;
    }

    const onSubmitIpo = (e) => {
        e.preventDefault()

        if (!cName || !openDateTime || !totalNumberOfShares || !pricePerShare || !remarks) {
            alert('Please fill the details!')
            return
        }

        sshowForm();

        AddIpoApi().then((data) => {
            GetIposApi().then((data) => {
                setipos(data);
                console.log(data);

            });
            alert('IPO added successfully');
            console.log(data);
        });

        setcName('')
        setopenDateTime('')
        settotalNumberOfShares('')
        setpricePerShare('')
        setremarks('')
    }

    async function UpdateIpoApi() {
        const res = await fetch('http://localhost:8084/updateIPO', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "cName": cName, "openDateTime": openDateTime, "totalNumberOfShares": totalNumberOfShares, "pricePerShare": pricePerShare, "remarks": remarks, "id": id })
        });
        return res;
    }

    const onUpdateIpo = (e) => {
        e.preventDefault()

        if (!cName || !openDateTime || !totalNumberOfShares || !pricePerShare || !remarks) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        UpdateIpoApi().then((data) => {
            GetIposApi().then((data) => {
                setipos(data);
                console.log(data);

            });
            alert('IPO updated successfully');
            console.log(data);
        });

        setcName('')
        setopenDateTime('')
        settotalNumberOfShares('')
        setpricePerShare('')
        setremarks('')
    }

    return (
        <div>
            <center>
                <h3>List of IPOs</h3>
                <table>
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
                                    <td><button onClick={() => {
                                        sshowForm();
                                        {
                                            setid(ipo.id);
                                            setcName(ipo.cName);
                                            setopenDateTime(ipo.openDateTime);
                                            settotalNumberOfShares(ipo.totalNumberOfShares);
                                            setpricePerShare(ipo.pricePerShare);
                                            setremarks(ipo.remarks);
                                        }
                                        setUpdate(true);
                                    }}>
                                        Edit</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <br /><br />

                <button onClick={sshowForm} >{update ? "Update IPO" : "Add IPO"}</button>

                {showForm && (
                    <form  onSubmit={update ? onUpdateIpo : onSubmitIpo}>
                        <p>
                            <label>Company Name : </label>
                            <input type="text"
                                value={cName}
                                onChange={(e) => setcName(e.target.value)} />
                        </p>
                        <p>
                            <label>Open Date Time : </label>
                            <input type="text" value={openDateTime}
                                onChange={(e) => setopenDateTime(e.target.value)} />
                        </p>
                        <p>
                            <label>Total No Of Shares : </label>
                            <input type="text" value={totalNumberOfShares}
                                onChange={(e) => settotalNumberOfShares(e.target.value)} />
                        </p>
                        <p>
                            <label>Price Per Share : </label>
                            <input type="text" value={pricePerShare}
                                onChange={(e) => setpricePerShare(e.target.value)} />
                        </p>
                        <p>
                            <label>Remarks: </label>
                            <input type="text" value={remarks}
                                onChange={(e) => setremarks(e.target.value)} />
                        </p>
                        <input type='submit' value={update ? 'Update IPO' : 'Add IPO'} />
                    </form>
                )}
            </center>
        </div>
    )
}

export default ManageIpo
