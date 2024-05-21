import React, { useState, useContext } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from "../App"

function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setCurrentUser } = useContext(UserContext);

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email, password
            })
                .then(res => {
                    if (res.data.status) {
                        setCurrentUser(res.data.data)
                        history("/")
                    }
                    else {
                        alert(res.data.data)
                    }
                })
                .catch(e => {
                    alert(e)
                })

        }
        catch (e) {
            alert(e)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20vh" }}>

            <h1>Login</h1>

            <form action="POST" style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <div className="input-group input-group-sm mb-3">
                    <input type="email" autoComplete="on" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="password" autoComplete="on" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <input type="submit" className="btn btn-primary" onClick={submit} />
            </form>

            <br />

            <Link to="/register">Register</Link>

        </div>
    )
}

export default Login