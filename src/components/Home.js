import React, { useState } from 'react';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import ManageCompany from './ManageCompany';
import ManageExchange from './ManageExchange';
import ManageIpo from './ManageIpo';
import SheetJSApp from './SheetJSApp';
import UserDashboard from './UserDashboard';
import Button from 'react-bootstrap/Button';
// import '../styles/home.css'

function Home() {

    const [togglenavlink, settogglenavlink] = useState(true);

    const ssettogglenavlink = () => {
        settogglenavlink(!togglenavlink);
    }

    return (
        <center>
            <div className='homecomp'>
                <h2>Welcome to Stock Market Charting 📈</h2>
                <br />
                <h3>Choose an option:</h3>
                <br />
                <p>
                    <BrowserRouter>
                        <div>
                            <div>
                                <NavLink activeClassName="active" to="/login" style={{ textDecoration: 'none' }}><Button variant="outline-info">Login</Button>{' '}</NavLink>

                                <NavLink activeClassName="active" to="/signup" style={{ textDecoration: 'none' }} ><Button variant="outline-info">Signup</Button>{' '}</NavLink>


                            </div>
                            <div>
                                <Switch>
                                    <Route path="/login" component={Login} />
                                    <Route path="/signup" component={Signup} />
                                    <Route path="/admindashboard" component={AdminDashboard} />
                                    <Route path="/userdashboard" component={UserDashboard} />
                                    <Route path="/importdata" component={SheetJSApp} />
                                    <Route path="/managecompany" component={ManageCompany} />
                                    <Route path="/manageexchange" component={ManageExchange} />
                                    <Route path="/manageipo" component={ManageIpo} />
                                    <Route path="/logout" component={Login} />
                                </Switch>
                            </div>
                        </div>
                    </BrowserRouter>
                </p>
            </div>
        </center>
    );
}

export default Home;