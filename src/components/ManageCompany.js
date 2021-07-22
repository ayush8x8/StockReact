import React, { useState } from 'react';
import { useEffect } from 'react';
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
        alert('Company mapped to exchange!')
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
        alert('Company deleted successfully');
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
            alert('Company updated successfully');
            console.log(data);
        });

        setcompanyName('')
        setcompanyBrief('')
        setceo('')
        setboardOfDirectors('')
        setsectorName('')
        setturnover('')
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
            alert('Company added successfully');
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
        <div>
            <center>
                <h3>List of Companies</h3>
                <table>
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
                                    <td><button onClick={() => {
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
                                        Edit</button></td>
                                    <td><button onClick={function () {
                                        DeleteCompanyApi(company.companyName);
                                    }}>Delete</button></td>
                                    {/* <td>
                                        
                                    </td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <br /><br />

                <button onClick={sshowForm} >{update ? "Update Company" : "Add New Company"}</button>

                {showForm && (
                    <form onSubmit={update ? onUpdateCompany : onSubmitCompany}>
                        <p>
                            <label>Company Name : </label>
                            <input type="text"
                                value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)} />
                        </p>
                        <p>
                            <label>Company Brief : </label>
                            <input type="text" value={companyBrief}
                                onChange={(e) => setcompanyBrief(e.target.value)} />
                        </p>
                        <p>
                            <label>CEO : </label>
                            <input type="text" value={ceo}
                                onChange={(e) => setceo(e.target.value)} />
                        </p>
                        <p>
                            <label>Board of Directors : </label>
                            <input type="text" value={boardOfDirectors}
                                onChange={(e) => setboardOfDirectors(e.target.value)} />
                        </p>
                        <p>
                            <label>Sector Name : </label>
                            <input type="text" value={sectorName}
                                onChange={(e) => setsectorName(e.target.value)} />
                        </p>
                        <p>
                            <label>Turnover : </label>
                            <input type="text" value={turnover}
                                onChange={(e) => setturnover(e.target.value)} />
                        </p>
                        <input type='submit' value={update ? 'Update Company' : 'Add Company'} />
                    </form>
                )}
                <br></br>
                <br></br>
                <button onClick={sshowExForm}>Add Exchange For Company</button>
                {showExForm && (
                    <form onSubmit={() => { StockExchangeToCompanyApi(exchangeName, companyName); sshowExForm(); }}>
                        <p>
                            <label>Company Name : </label>
                            <input type="text" value={companyName}
                                onChange={(e) => setcompanyName(e.target.value)} />
                        </p>
                        <p>
                            <label>Exchange Name : </label>
                            <input type="text" value={exchangeName}
                                onChange={(e) => setexchangeName(e.target.value)} />
                        </p>
                        <input type='submit' value='Add' />
                    </form>
                )}
            </center>
        </div >
    )
}

export default ManageCompany
