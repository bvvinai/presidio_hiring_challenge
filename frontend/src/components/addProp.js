import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddProp() {

    const history = useNavigate();
    const [place, setPlace] = useState('')
    const [area, setArea] = useState('')
    const [bathrooms, setBathrooms] = useState(null)
    const [bedrooms, setBedrooms] = useState(null)
    const [nearby, setNearby] = useState('')
    const [title, setTitle] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post(`${process.env.REACT_APP_API_URL}/api/postitem`, {
                place, area, bathrooms, bedrooms, nearby, title
            })
                .then(res => {
                    if (res.data.status) {
                        alert(res.data.data)
                        history('/properties')
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "15vh" }}>
            <h3>Add Property</h3>
            <form action="POST" style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setPlace(e.target.value) }} placeholder="Place" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setArea(e.target.value) }} placeholder="Area" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="number" onChange={(e) => { setBedrooms(e.target.value) }} placeholder="Bedrooms" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="number" onChange={(e) => { setBathrooms(e.target.value) }} placeholder="Bathrooms" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setNearby(e.target.value) }} placeholder="Nearby" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <input type="submit" className="btn btn-primary" onClick={submit} />
            </form>
        </div>
    )
}

export default AddProp