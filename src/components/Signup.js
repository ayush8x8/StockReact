import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { deployhost2, deployhost } from './deploylink';

function Signup() {

    const history = useHistory();

    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');

    async function SignupApi() {
        const res = await fetch(`${deployhost2}/setuserapi`, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": userName, "password": password, "email": email, "mobilenumber": mobilenumber, "admin": false, "confirmed": false, "role": "user" })
        });
        return res;
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (!userName || !password || !email || !mobilenumber) {
            alert('Please fill the details')
            return
        }



        SignupApi().then((data) => {

            history.push("/login");
            console.log(data);
        });

        setuserName('')
        setpassword('')
        setemail('')
        setmobilenumber('')

    }
    return (
        <Container>
            <br />
            <br />
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Username'
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Password: </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Email: </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Mobilenumber: </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Mobilenumber'
                            value={mobilenumber}
                            onChange={(e) => setmobilenumber(e.target.value)}
                        />
                    </Form.Group>
                    <br />
                    <Button variant="outline-dark" type="submit">
                        Signup
                    </Button>
                </Form>
            </Container>
        </Container>
    )
}

export default Signup
