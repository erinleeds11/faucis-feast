
  
  function Homepage() {
    return (
      <React.Fragment>
        <h1>Fauci's Feast</h1>
        <h3>Rate your local restaurants on Covid Readiness</h3>
      </React.Fragment>
    );
  }

  function CreateAccount() {

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    function handleSubmit(event) {
      event.preventDefault();

    //   const newUser = {
    //     fname: this.state.firstName,
    //     lname: this.state.lastName,
    //     email: this.state.email,
    //     password: this.state.password,
    //   }
    // }

    return (
      <React.Fragment>
      <div className="CreateAccount">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className = "firstName">
            First Name: <input type = "text" name = "fname" value = {firstName} onChange={e => setFirstName(e.value)}></input>
          </div>
          <div className = "lastName">
            Last Name: <input type = "text" name = "lname" value = {lastName} onChange={e => setLastName(e.value)}></input>
          </div>
          <div className = "email">
            Email: <input type = "text" name = "email" value = {email} onChange={e => setEmail(e.value)}></input>
          </div>
          <div className = "firstName">
            Password: <input type = "password" name = "password" value = {password} onChange={e => setPassword(e.value)}></input>
          </div>
          <button type = "submit">Create Account</button> 
        </form>
        Already have an account? <a href = "/login">Log in</a>
      </div>
      </React.Fragment>
      );
    }
  
  ReactDOM.render(
    <Homepage/>,
    document.querySelector('#root')
  );

  ReactDOM.render(
    <CreateAccount />,
    document.querySelector('#container')
  );

