import React, { useState } from 'react';
import ManageCompany from './ManageCompany';
import ManageExchange from './ManageExchange';
import ManageIpo from './ManageIpo';
import SheetJSApp from './SheetJSApp';
import { useHistory } from 'react-router-dom';
// import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import { Button, Container, Nav } from 'react-bootstrap';

function AdminDashboard() {

    const [comp, setComp] = useState('');
    const history = useHistory();

    return (
        <Container>
            <hr style={{ color: '#39FF14' }}></hr>
            <center><h2>Admin Dashboard</h2></center>
            <br></br>


            <Nav fill variant="pills">
                <Nav.Item><Nav.Link onClick={function () { setComp('ImportData') }} eventKey="f">Import Data</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ManageCompany') }} eventKey="g">Manage Company</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ManageExchange') }} eventKey="h">Manage Exchange</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ManageIpo') }} eventKey="i">Update IPO details</Nav.Link></Nav.Item>

                <Button variant="outline-info" onClick={() => {
                    window.sessionStorage.clear();
                    history.push("/login");
                }}>Logout</Button>
            </Nav>
            <div>
                {comp === 'ManageCompany' && (
                    <ManageCompany />
                )}
                {comp === 'ManageExchange' && (
                    <ManageExchange />
                )}
                {comp === 'ManageIpo' && (
                    <ManageIpo />
                )}
                {comp === 'ImportData' && (
                    <SheetJSApp />
                )}
            </div>



        </Container>
    )
}

export default AdminDashboard
