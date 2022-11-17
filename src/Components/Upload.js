import react, { useEffect, useState } from "react";

function Upload(props) {
  if (props.sess.isLoggedIn == false) window.location.href = "/login";

  const [img, setImg] = useState([]);
  useEffect(() => {
    console.log(1);
    if (props.sess.user) {
      // console.log(props.sess.user)
      var data = { email: props.sess.user.email };
      // var body = {"email": props.sess.user.email}
      fetch("https://abhijit-dobby-back.herokuapp.com/todoData", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          setImg(result);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);

  function addImage(e) {
    e.preventDefault();
    // var data = {
    // 	text: e.target[0].value,
    // 	pic: e.target[1].files[0]

    //   }

    //   console.log(e.target[1].files[0])
    //   let val =

    let data = new FormData();

    data.append("image", e.target[1].files[0]);
    data.append("text", e.target[0].value);

    console.log(JSON.stringify(data));
    // 	  fetch("http://localhost:3001/todo", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    //   credentials: "include",
    // })
    // 		 .then((response) => response.json())
    // 		 .then((data) => {
    // 	console.log(data)

    // 							 })
    // 		 .catch((err) => {
    // 			console.log(err);
    // 		 });
  }
  function logout() {
    console.log("preesed");
    fetch("https://abhijit-dobby-back.herokuapp.com/logout", { credentials: "include" })
      .then((res) => res.json())
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
    window.location.href = "/login";
  }

  const handleKeyUp = (event) => {

    // console.log(event.target.value);
    fetch("https://abhijit-dobby-back.herokuapp.com/getData", {
        method: "POST",
        body: JSON.stringify({payload: event.target.value}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      }).then(res=> res.json())
      .then(data=>{
        let payload = data.payload;
        console.log(payload)
        setImg(payload)
      })
    // console.log(event.code);
  };
  
// function searchData(e){

        //        .then((response) => response.json())
        //        .then((data) => {
        //   console.log(data)
                  
        //                            })
        //        .catch((err) => {
        //           console.log(err);
            //    });
// }

  return (
    <>
      <link rel="stylesheet" href="/css/mystyle.css" />

      <h1>
        welcome{" "}
        {props.sess.isLoggedIn === true ? props.sess.user.firstname : "Guest"}
      </h1>
      {/* <img src="<%= user.profile_pic %>"/> */}
      {/* <!-- <img src="/p"/> --> */}
      <button onClick={logout}>logout</button>
      {/* <iframe name="dummyframe" id="dummyframe" ></iframe> */}

      <form
        action="https://abhijit-dobby-back.herokuapp.com/todo"
        method="post"
        encType="multipart/form-data"
        target="_blank"
      >
        <input placeholder="Enter Name of the image" name="text" id="ip" />
        <input type="file" name="pic" accept="image/*" />
        <input type="submit" value="save" />
      </form>

<br/><br/>
<div>
    {/* <form> */}
        <input placeholder="Search ...." name="text" id="ip"  onChange={handleKeyUp}  />
        
        {/* </form> */}
        </div>


      {img.map((todo, index) => (
        <>
          <div class="gallery">
            {/* <img className='card' src={`http://localhost:3001/uploads/${todo.pic}`} /> */}
            <img
              src={`https://abhijit-dobby-back.herokuapp.com/uploads/${todo.pic}`}
              alt="Cinque Terre"
              width="600"
              height="400"
            />

            <div className="desc">{todo.text}</div>
          </div>
        </>
      ))}
    </>
  );
}

export default Upload;
