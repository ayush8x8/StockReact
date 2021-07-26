import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/stylesheet.css';
import { Button, Container, Form, Table } from 'react-bootstrap';

function ManageProfile({ location }) {

    const [showForm, setShowForm] = useState(false);

    const sshowForm = () => {
        setShowForm(!showForm);
        setuserName(user.name);
        setpassword(user.password)
        setemail(user.email);
        setmobilenumber(user.mobilenumber);
    }

    const [user, setUser] = useState({});
    const history = useHistory()
    const [userName, setuserName] = useState(history.location.state.userName);
    const [password, setpassword] = useState(history.location.state.password);
    const [id, setid] = useState(history.location.state.id);
    const [mobilenumber, setmobilenumber] = useState('');
    const [email, setemail] = useState('');

    const GET_USER_API = 'https://ayushstockmarketspring.herokuapp.com/getUserByNameAndPass';
    async function GetUserApi() {
        const res = await fetch(GET_USER_API, {
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

    useEffect(() => {
        GetUserApi().then((data) => {
            setUser(data);
            console.log(data);
        });
    }, [])

    async function UpdateUserApi() {
        const res = await fetch('https://ayushstockmarketspring.herokuapp.com/updateUser', {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": userName, "password": password, "email": email, "mobilenumber": mobilenumber, "admin": false, "confirmed": true, "id": id })
        });
        return res;
    }

    const onUpdateUser = (e) => {
        e.preventDefault()

        if (!userName || !password || !email || !mobilenumber) {
            alert('Please fill the details')
            return
        }

        sshowForm();

        UpdateUserApi().then((data) => {
            GetUserApi().then((data) => {
                setUser(data);
                console.log(data);

            });
            // alert('User updated successfully');
        });

        setuserName('')
        setpassword('')
        setemail('')
        setmobilenumber('')
    }

    return (
        <Container>
            <br></br>
            <h3>User Info:</h3>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>MOBILE NUMBER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobilenumber}</td>
                    </tr>
                </tbody>
            </Table>
            <br /><br />

            <Button variant="outline-secondary" type="submit" onClick={sshowForm}>
                Update
            </Button>
            <br /><br />
            {showForm && (
                <Form onSubmit={onUpdateUser}>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name : </Form.Label>
                        <Form.Control type="text"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)} />
                    
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>User Password : </Form.Label>
                        <Form.Control type="text" value={password}
                            onChange={(e) => setpassword(e.target.value)} />
                    
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email : </Form.Label>
                        <Form.Control type="text" value={email}
                            onChange={(e) => setemail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile Number : </Form.Label>
                        <Form.Control type="text" value={mobilenumber}
                            onChange={(e) => setmobilenumber(e.target.value)} />
                    </Form.Group>
                    <br /><br />
                    <Button variant="outline-success" type="submit">
                        Update User
                    </Button>
                </Form>
            )}
        </Container>
    )
}

export default ManageProfile
