import React from 'react';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import ManageCompany from './ManageCompany';
import ManageExchange from './ManageExchange';
import ManageIpo from './ManageIpo';
import SheetJSApp from './SheetJSApp';
import UserDashboard from './UserDashboard';

function Home() {



    return (
        <div>
            <p>Welcome to Stock Market Charting!</p>
            <p>Choose an option:</p>
            <p>
                <BrowserRouter>
                    <div>
                        <div>
                            <NavLink activeClassName="active" to="/login">Login</NavLink>
                            <span> or </span>
                            <NavLink activeClassName="active" to="/signup">Signup</NavLink>
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
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </p>
        </div>
    );
}

export default Home;