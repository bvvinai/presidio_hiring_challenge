import React from "react"
import axios from "axios"

function Card(props) {
    const prop = props.data;

    async function deleteProp() {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/deleteitem/${prop._id}`)
                .then(res => {
                    if (res.data.status) {
                        alert(res.data.data)
                        props.refresh([])
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
                    <div>Likes: {prop.likes.length}</div>
                    <div>
                        <a href={`/properties/updateprop/` + prop._id} style={{ marginLeft: "10px" }} className="btn btn-outline-primary btn-sm">Update</a>
                        <button style={{ marginLeft: "10px" }} className="btn btn-outline-danger btn-sm" onClick={deleteProp}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card