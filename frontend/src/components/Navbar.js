import React, { useContext } from "react"
import { UserContext } from "../App"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";

function Navbar() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const history = useNavigate();

    async function logout() {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`);
        setCurrentUser(null);
        history("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div><Link className="navbar-brand" to="/">Rentify</Link></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ flexGrow: 0 }}>
                    {
                        currentUser == null ?
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/properties">My Properties</Link>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" >{currentUser.email}</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link"><button style={{ border: "none" }} onClick={logout}>Logout</button></div>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar