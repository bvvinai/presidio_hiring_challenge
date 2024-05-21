import React, { useState, useEffect } from "react"
// import { UserContext } from "../App"
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "./card";

function Properties() {

    // const { currentUser } = useContext(UserContext);
    const [plist, setPlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/getmyitems`).then(({ data }) => {
            setPlist(data.data);
            setLoading(false);
        });
    }, [plist]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Link style={{ margin: "50px", border: "solid 1px black", borderRadius: "50px", padding: "10px 30px" }} className="link-offset-2 link-underline link-underline-opacity-0" to="/properties/addprop">Add Property</Link>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {loading ? <CircularProgress /> :
                    plist.map((l) => <Card key={l._id} data={l} refresh={setPlist} />)
                }
            </div>
        </div >
    )
}

export default Properties