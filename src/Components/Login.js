import React,{useState, useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'

function Login(props){
    const [success, setSuccess]= useState('');
    let navigate = useNavigate();
useEffect(()=>{
if(props.sess.user)
navigate('/')
},[props])
        function loggedIn(e) {
          e.preventDefault();
          // console.log(e.target[0].value)
          var data = {
            email: e.target[0].value,
            password: e.target[1].value,
          };
          console.log(data);
          fetch("https://abhijit-dobby-back.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            credentials: "include",
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            if(data)
                window.location.href = '/'
            // navigate('/')
            else
            {
              setSuccess("Incorrect username or password")
            }
          })
            .catch((err) => {
              console.log(err);
            });
        }

        // useEffect(() => {
        //     fetch("https://localhost:3001/login", { credentials: "include" })
        //       // .then(res => res.json())
        //       .then((response) => response.json())
        //              .then((data) => {
        //         if(data.loggedIn === true)
        //         navigate('/')
           
        //              })
        //              .catch((err) => {
        //                 console.log(err);
        //               })
              
        //   }, []);

    return (
    <>
     <div className="container">
      
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={loggedIn}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                name="email"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                autoComplete="on"
                name="password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <span className="button__text">{success}</span>

          </form>
        
    

          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="/" className="social-login__icon fab fa-instagram"></a>
              <a href="/" className="social-login__icon fab fa-facebook"></a>
              <a href="/" className="social-login__icon fab fa-twitter"></a>
              <Link to='/signup'><b>Register Now</b></Link>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
    
    </>        
    )
}

export default Login;