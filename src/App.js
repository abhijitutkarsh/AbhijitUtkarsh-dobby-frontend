import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React,{useState, useEffect} from "react";
import './App.css';
import Upload from './Components/Upload';
import Login from './Components/Login';
import SignUp from './Components/Signup';

function App() {

  var [sess,setSess] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/login", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn === true) 
      { 
        setSess(data)
      }
        else
        {
          setSess({isLoggedIn: false})

        }

  console.log(data)

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
  <>
  <Router>
    <Routes>
      {/* Exact match to avoid 
          overriding other routes */}
      <Route exact path="/" element={<Upload sess={sess} setSess={setSess} />}/>
     
      <Route path="/login" element = {<Login sess={sess} setSess={setSess} />}/>
      <Route path="/signup" element = {<SignUp sess={sess} setSess={setSess} />}/>
   
    </Routes>
    </Router>
  </>
  )
}

export default App;
