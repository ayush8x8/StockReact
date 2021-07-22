import React, { useState } from 'react';
import ManageCompany from './ManageCompany';
import ManageExchange from './ManageExchange';
import ManageIpo from './ManageIpo';
import ManageProfile from './ManageProfile';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

function UserDashboard() {

    const [comp, setComp] = useState('');

    return (
        <div>
            <hr></hr>
            <center><h2>User Dashboard</h2></center>

            <center>
                <div>
                    <div>
                        <button onClick={function () { setComp('ManageProfile') }}>User Profile</button>
                        <span>  </span>
                        <button onClick={function () { setComp('ManageCompany') }}>Manage Company</button>
                        <span>  </span>
                        <button onClick={function () { setComp('ManageExchange') }}>Manage Exchange</button>
                        <span>  </span>
                        <button onClick={function () { setComp('ManageIpo') }}>Update IPO details</button>
                        <span>  </span>
                        <button>Logout</button>
                    </div>
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
                        {comp === 'ManageProfile' && (
                            <ManageProfile />
                        )}
                    </div>
                </div>
            </center>

        </div>
    )
}

export default UserDashboard