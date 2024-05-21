import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import axios from "axios";
import { createContext } from 'react';
import React, { useState, useEffect } from "react"
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import AddProp from './components/addProp';
import UpdateProp from './components/updateProp';
import SellerPage from './components/sellerPage';

axios.defaults.withCredentials = true
const UserContext = createContext(null);

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser == null) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/profile`).then(({ data }) => {
        setCurrentUser(data);
      });
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/register' Component={Register} />
            <Route path='/login' Component={Login} />
            <Route path='/properties' Component={Properties} />
            <Route path='/properties/addprop' Component={AddProp} />
            <Route path='/properties/updateprop/:id' Component={UpdateProp} />
            <Route path='/getseller/:id' Component={SellerPage} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
