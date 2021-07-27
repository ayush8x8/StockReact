import React, { useState } from 'react';
import ViewCompany from './ViewCompany';
import ViewExchange from './ViewExchange';
import ViewIpo from './ViewIpo';
import ViewSector from './ViewSector';
import ManageProfile from './ManageProfile';
import ComparisonCharts from './ComparisonCharts';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { Button, Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


function UserDashboard() {

    const [comp, setComp] = useState('');
    const history = useHistory();

    return (
        <Container>
            <hr style={{ color: '#39FF14' }}></hr>
            <center><h2>User Dashboard</h2></center>
            <br />

            <Nav fill variant="pills">
                <Nav.Item><Nav.Link onClick={function () { setComp('ManageProfile') }} eventKey="a">User Profile</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ViewCompany') }} eventKey="b">View Company Info</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ViewSector') }} eventKey="c">View Sector Info</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ViewExchange') }} eventKey="d">View Exchange Info</Nav.Link></Nav.Item>

                <Nav.Item><Nav.Link onClick={function () { setComp('ViewIpo') }} eventKey="e">View IPO Info</Nav.Link></Nav.Item>

                <Button variant="outline-info" onClick={() => {
                    window.sessionStorage.clear();
                    history.push("/login");
                }}>Logout</Button>

            </Nav>
            {/* <BrowserRouter>
                <NavLink activeClassName="active" to="/logout" style={{ textDecoration: 'none' }} ><Button variant="outline-info">Logout</Button>{' '}</NavLink>
            </BrowserRouter> */}
            <div>
                {comp === 'ViewCompany' && (
                    <ViewCompany />
                )}
                {comp === 'ViewSector' && (
                    <ViewSector />
                )}
                {comp === 'ViewExchange' && (
                    <ViewExchange />
                )}
                {comp === 'ViewIpo' && (
                    <ViewIpo />
                )}
                {comp === 'ManageProfile' && (
                    <ManageProfile />
                )}
                {comp === 'ComparisonCharts' && (
                    <ComparisonCharts />
                )}
            </div>
        </Container>
    )
}

export default UserDashboard