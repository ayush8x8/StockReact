import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link, BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { deployhost2, deployhost } from './deploylink';

function Login() {

    const history = useHistory();

    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')

    async function LoginApi() {
        const res = await fetch(`${deployhost2}/authenticate`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "username": userName, "password": password })
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
            window.sessionStorage.setItem("userName", data.user.name);
            // window.sessionStorage.setItem("userObj", JSON.stringify(data));
            // console.log(window.sessionStorage.getItem("userObj"));
            window.sessionStorage.setItem("token", data.token);
            console.log(data);
            // if (data.response == "not confirmed") {
            //     alert('Please confirm from your email id!')
            // }
            // else if (data.response == "not found") {
            //     alert('Please check your credentials!')
            // }
            
                if (data.user.admin == true)
                    history.push("/admindashboard");
                if (data.user.admin == false)
                    history.push('/userdashboard', { userName: data.user.name, password: data.user.password, id: data.user.id });
        });

        setuserName('')
        setpassword('')
    }
    return (
        <Container>
            <br />
            <br />
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Username'
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </Form.Group>
                    {/* <input type='submit' value='Login' /> */}
                    <br />
                    <Button variant="outline-dark" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </Container>
    )
}

export default Login
