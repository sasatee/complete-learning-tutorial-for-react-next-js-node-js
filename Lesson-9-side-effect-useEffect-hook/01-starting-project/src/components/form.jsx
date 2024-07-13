import React from 'react'

const Form = () => {
  return (
    <>
<div className="main-block">
  <h1>Registration</h1>
  <form action="/">
    <hr />
    <div className="account-type">
      <input type="radio" defaultValue="none"  name="account" defaultChecked />
      <label htmlFor="radioOne" className="radio">Personal</label>
      <input type="radio" defaultValue="none"  name="account" />
      <label htmlFor="radioTwo" className="radio">Company</label>
    </div>
    <hr />
    <label  htmlFor="name"><i className="fas fa-envelope" /></label>
    <input type="text" name="name"  placeholder="Email" required />
    <label  htmlFor="name"><i className="fas fa-user" /></label>
    <input type="text" name="name"  placeholder="Name" required />
    <label  htmlFor="name"><i className="fas fa-unlock-alt" /></label>
    <input type="password" name="name"  placeholder="Password" required />
    <hr />
    <div className="gender">
      <input type="radio" defaultValue="none"  name="gender" defaultChecked />
      <label htmlFor="male" className="radio">Male</label>
      <input type="radio" defaultValue="none"  name="gender" />
      <label htmlFor="female" className="radio">Female</label>
    </div>
    <hr />
    <div className="btn-block">
      <p>By clicking Register, you agree on our <a href="https://www.w3docs.com/privacy-policy">Privacy Policy for W3Docs</a>.</p>
      <button type="submit" href="/">Submit</button>
    </div>
  </form>
</div>

  
      
    </>
  )
}

export default Form
