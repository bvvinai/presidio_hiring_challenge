import React, { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material";
import axios from "axios";
import GeneralCard from "./generalCard";

function Home() {

    const [plist, setPlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [ppage, setPpage] = useState(3);
    const [bathrooms, setBathrooms] = useState(null)
    const [bedrooms, setBedrooms] = useState(null)
    const [text, setText] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/getallitems/${page}`).then(({ data }) => {
            setPlist(data.data);
            setLoading(false);
        });
    }, [page]);

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/search`, {
                bathrooms, bedrooms, text
            })
                .then(res => {
                    if (res.data.status) {
                        setPlist(res.data.data)
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <form action="POST" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "50px 50px 0 50px" }}>
                <div className="input-group input-group-sm m-2">
                    <input type="text" onChange={(e) => { setText(e.target.value) }} placeholder="Search for Title / Place / Area / Nearby Places" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group-sm m-2">
                    <input type="number" onChange={(e) => { setBedrooms(e.target.value) }} placeholder="Bedrooms" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group-sm m-2">
                    <input type="number" onChange={(e) => { setBathrooms(e.target.value) }} placeholder="Bathrooms" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group-sm m-2">
                    <input type="submit" style={{ paddingLeft: "30px", paddingRight: "30px" }} className="btn btn-primary btn-sm" value="Search" onClick={submit} />
                </div>
            </form>
            <nav aria-label="Page navigation example" style={{ margin: "50px 0 10px 0 " }}>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${ppage <= 3 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => { setPage(page - 1); setPpage(ppage - 1) }}>Previous</button>
                    </li>
                    <li className={`page-item ${page === ppage - 2 ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage - 2)}>{ppage - 2}</button></li>
                    <li className={`page-item ${page === ppage - 1 ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage - 1)}>{ppage - 1}</button></li>
                    <li className={`page-item ${page === ppage ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage)}>{ppage}</button></li>
                    <li className={`page-item ${plist.length === 0 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => { setPage(page + 1); setPpage(ppage + 1) }}>Next</button>
                    </li>
                </ul>
            </nav>
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {loading ? <CircularProgress /> :
                    plist.map((l) => <GeneralCard key={l._id} data={l} refresh={setPlist} />)
                }
            </div>
            <nav aria-label="Page navigation example" style={{ margin: "20px 0 50px 0 " }}>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${ppage <= 3 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => { setPage(page - 1); setPpage(ppage - 1) }}>Previous</button>
                    </li>
                    <li className={`page-item ${page === ppage - 2 ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage - 2)}>{ppage - 2}</button></li>
                    <li className={`page-item ${page === ppage - 1 ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage - 1)}>{ppage - 1}</button></li>
                    <li className={`page-item ${page === ppage ? "active" : ""}`}><button className="page-link" onClick={() => setPage(ppage)}>{ppage}</button></li>
                    <li className={`page-item ${plist.length === 0 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => { setPage(page + 1); setPpage(ppage + 1) }}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Home