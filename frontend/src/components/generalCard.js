import React, { useContext, useState } from "react"
import { UserContext } from "../App"
import axios from "axios"
import { Link } from "react-router-dom";

function GeneralCard(props) {
    const prop = props.data;
    const [likes, setLikes] = useState(prop.likes)
    const { currentUser } = useContext(UserContext);

    async function likeProp() {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/likeprop/${prop._id}`)
                .then(res => {
                    if (res.data.status) {
                        setLikes(res.data.data)
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

    async function unlikeProp() {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/unlikeprop/${prop._id}`)
                .then(res => {
                    if (res.data.status) {
                        setLikes(res.data.data)
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
        <div className="card w-auto" style={{ margin: "10px", padding: "10px" }}>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <h5 className="card-title">{prop.title}</h5>
                <p style={{ marginBottom: 0 }} className="card-text">Place : {prop.place}</p>
                <p style={{ marginBottom: 0 }} className="card-text">Area : {prop.area}</p>
                <p style={{ marginBottom: 0 }} className="card-text">No of Bedrooms: {prop.bedrooms}</p>
                <p style={{ marginBottom: 0 }} className="card-text">No of Bathrooms: {prop.bathrooms}</p>
                <p style={{ marginBottom: 15 }} className="card-text">Nearby Places: {prop.nearby}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "10px" }}>Likes: {likes.length}</div>
                        {
                            currentUser == null ? <></> :
                                likes.includes(currentUser.email) ?
                                    <button className="btn btn-outline-info btn-sm" onClick={unlikeProp}>Dislike</button> :
                                    <button className="btn btn-outline-info btn-sm" onClick={likeProp}>Like</button>
                        }
                    </div>
                    <Link style={{ marginLeft: "10px" }} className="btn btn-outline-primary btn-sm" to={`/getseller/${prop._id}`} >Im Interested</Link>
                </div>
            </div>
        </div>
    )
}

export default GeneralCard