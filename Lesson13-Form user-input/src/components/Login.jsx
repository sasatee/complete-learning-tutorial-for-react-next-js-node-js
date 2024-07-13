import { useRef, useState } from "react";

export default function Login() {
 const [emailIsInValid,setEmailIsInvalid] = useState(false)

  const email = useRef()
  const password = useRef()
  
  function handleSubmit(event) {

  
    event.preventDefault(); // prevent default browser behaviour
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;


    const emailIsvalid =enteredEmail.includes("@")

    if (!emailIsvalid){
      setEmailIsInvalid(true);
      return;
    }
    setEmailIsInvalid(false)
    console.log("Sending https requests")
    // console.log(enteredEmail,enteredPassword)
    // email.current.value=""  //typically not recommended as using ref
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            ref={email}
       
          />
          <div className="control-error">{emailIsInValid &&<p>Please enter a valid email address.</p> }</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={password}
         
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}
