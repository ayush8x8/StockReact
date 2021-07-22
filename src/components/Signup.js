import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {

    const history = useHistory();

    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobilenumber, setmobilenumber] = useState('');

    async function SignupApi() {
        const res = await fetch('http://localhost:8084/setuserapi', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": userName, "password": password, "email": email, "mobilenumber": mobilenumber, admin: false, confirmed: false })
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
        <div>
            <hr></hr>
            <h3>Signup</h3>
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
                <div >
                    <label>Email: </label>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                </div>
                <div >
                    <label>Mobilenumber: </label>
                    <input
                        type='text'
                        placeholder='Mobilenumber'
                        value={mobilenumber}
                        onChange={(e) => setmobilenumber(e.target.value)}
                    />
                </div>
                <input type='submit' value='Signup' />
            </form>
        </div>
    )
}

export default Signup
