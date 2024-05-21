import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Register() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phno, setPhno] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                email, password, firstname, lastname, phno
            })
                .then(res => {
                    if (res.data.status) {
                        alert(res.data.data)
                        history("/login")
                    }
                    else {
                        alert(res.data.data)
                    }
                })
                .catch(e => {
                    alert(e.message);
                })

        }
        catch (e) {
            alert(e);
        }

    }


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "15vh" }}>

            <h1>Register</h1>

            <form action="POST" style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setFirstName(e.target.value) }} placeholder="First Name" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setLastName(e.target.value) }} placeholder="Last Name" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="tel" onChange={(e) => { setPhno(e.target.value) }} placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <input type="submit" className="btn btn-primary" onClick={submit} />
            </form>

            <br />

            <Link to="/login">Login</Link>

        </div>
    )
}

export default Register