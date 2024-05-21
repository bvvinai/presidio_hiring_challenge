import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

function SellerPage() {

    const { id } = useParams();
    const history = useNavigate();
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/getsellerbyid/${id}`).then(({ data }) => {
            if (data.status) {
                setUser(data.data)
            }
            else {
                alert("Login First!")
                history('/login')
            }
        });
    }, [id, history]);

    return (
        user == null ? <></> :
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: 100 }}>
                <div className="card text-center w-75">
                    <div className="card-header">
                        SELLER DETAILS
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{user.firstname} {user.lastname}</h5>
                        <p style={{ marginBottom: 0 }} className="card-text">Phone Number : {user.phno}</p>
                        <p className="card-text">Email : {user.email}</p>
                        <a href="/" className="btn btn-primary">Go Back</a>
                    </div>
                    <div className="card-footer text-body-secondary">
                        Email has been sent to both the parties.
                    </div>
                </div>
            </div>
    )
}

export default SellerPage