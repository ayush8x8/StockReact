import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import '../styles/stylesheet.css';

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

    const GET_USER_API = 'http://localhost:8084/getUserByNameAndPass';
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
        const res = await fetch('http://localhost:8084/updateUser', {
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
            alert('User updated successfully');
        });

        setuserName('')
        setpassword('')
        setemail('')
        setmobilenumber('')
    }

    return (
        <div>
            <center>
                <h3>User Info</h3>
                <table>
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
                </table>
                <br /><br />

                <button onClick={sshowForm} >Update User</button>

                {showForm && (
                    <form onSubmit={onUpdateUser}>
                        <p>
                            <label>User Name : </label>
                            <input type="text"
                                value={userName}
                                onChange={(e) => setuserName(e.target.value)} />
                        </p>
                        <p>
                            <label>User Password : </label>
                            <input type="text" value={password}
                                onChange={(e) => setpassword(e.target.value)} />
                        </p>
                        <p>
                            <label>Email : </label>
                            <input type="text" value={email}
                                onChange={(e) => setemail(e.target.value)} />
                        </p>
                        <p>
                            <label>Mobile Number : </label>
                            <input type="text" value={mobilenumber}
                                onChange={(e) => setmobilenumber(e.target.value)} />
                        </p>
                        <input type='submit' value='Update User' />
                    </form>
                )}
            </center>
        </div>
    )
}

export default ManageProfile
