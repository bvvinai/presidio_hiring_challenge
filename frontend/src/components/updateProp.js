import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

function UpdateProp() {
    const { id } = useParams();
    const history = useNavigate();
    const [title, setTitle] = useState('')
    const [place, setPlace] = useState('')
    const [area, setArea] = useState('')
    const [bathrooms, setBathrooms] = useState(0)
    const [bedrooms, setBedrooms] = useState(0)
    const [nearby, setNearby] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/getitembyid/${id}`).then(({ data }) => {
            if (data.status) {
                setTitle(data.data.title)
                setPlace(data.data.place)
                setArea(data.data.area)
                setBathrooms(data.data.bathrooms)
                setBedrooms(data.data.bedrooms)
                setNearby(data.data.nearby)
            }
            else {
                alert(data.data)
                history('/properties')
            }
        });
    }, [id, history]);

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post(`${process.env.REACT_APP_API_URL}/api/updateitem/${id}`, {
                title, place, area, bathrooms, bedrooms, nearby
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
            <h3>Update Property</h3>
            <form action="POST" style={{ display: "flex", flexDirection: "column", width: "400px" }}>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} placeholder="Title" value={title} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setPlace(e.target.value) }} placeholder="Place" value={place} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setArea(e.target.value) }} placeholder="Area" value={area} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="number" onChange={(e) => { setBedrooms(e.target.value) }} placeholder="Bedrooms" value={bedrooms} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="number" onChange={(e) => { setBathrooms(e.target.value) }} placeholder="Bathrooms" value={bathrooms} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <input type="text" onChange={(e) => { setNearby(e.target.value) }} placeholder="Nearby" value={nearby} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <input type="submit" className="btn btn-primary" onClick={submit} />
            </form>
        </div>
    )
}

export default UpdateProp