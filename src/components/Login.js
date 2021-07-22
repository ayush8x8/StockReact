import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

function Login() {

    const history = useHistory();

    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    async function LoginApi() {
        const res = await fetch('http://localhost:8084/getUserByNameAndPass', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": userName, "password": password })
        });
        return res.json();
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!userName || !password) {
            alert('Please fill the details')
            return
        }

        LoginApi().then((data) => {
            window.sessionStorage.setItem("userName", data.name);
            window.sessionStorage.setItem("userObj", JSON.stringify(data));
            console.log(window.sessionStorage.getItem("userObj"));
            console.log(data);
            if (data.response == "not confirmed") {
                alert('Please confirm from your email id!')
            }
            else if (data.response == "not found") {
                alert('Please check your credentials!')
            }
            else{
                if(data.admin == true)
                    history.push("/admindashboard");
                if(data.admin == false)
                history.push('/userdashboard', { userName: data.name, password: data.password, id: data.id });
            }
        });

        setuserName('')
        setpassword('')
    }
    return (
        <div>
            {/* <BrowserRouter>
                <div>
                    <div>
                        <Switch>
                            <Route path="/admindashboard" component={AdminDashboard} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter> */}


            <hr></hr>
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <div >
                    <label>Username: </label>
                    <input
                        type='text'
                        placeholder='Username'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                </div>
                <div >
                    <label>Password: </label>
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login
