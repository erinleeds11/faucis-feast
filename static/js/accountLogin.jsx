
 

function Homepage() {
    const history = ReactRouterDOM.useHistory();
    const redirectRest=()=> {
        history.push('/restaurant-search');
    }
    return (<div>
        <h2 id="top"><span><img id="big_logo" src={'static/images/logo.png'}/></span>Fauci's Feast</h2>
        <h5>Rate your local restaurants on Covid-19 Readiness</h5>
        <h6><button onClick = {redirectRest}>Find restaurants</button></h6>
</div> );
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateAccount(props) {
    const history = ReactRouterDOM.useHistory();
    const [fname, setFirstName] = React.useState("");
    const [lname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const makeUser = () => {
        if ((fname !== undefined) && (lname !== undefined) && (email !== undefined) && (password !== undefined)) {
            const user = {"fname": fname, "lname": lname, "email": email, "password":password}
            fetch('/api/create-user', {
                method: 'POST', 
                body: JSON.stringify(user),
                headers: {
                'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
                .then(data => {
                if (data === 'account exists') {
                    alert('Account with that email already exists')
                } else if (data=== "ok") {
                    alert('Account created!')
                    history.push('/login')
                } 
                })
    } else {
        alert("Invaled entry.")
    }
}
    
    return (
    <div className = " create_account row">
        <div className="col s3"></div>
        <div className=" col s6">
            <h4><i class="medium material-icons">person</i>Create Account</h4>
            <div className = "firstName">
                First Name: <input type = "text" name = "fname" value = {fname} onChange={e => setFirstName(e.target.value)}></input>
            </div>
            <div className = "lastName">
                Last Name: <input type = "text" name = "lname" value = {lname} onChange={e => setLastName(e.target.value)}></input>
            </div>
            <div className = "email">
                Email: <input type = "text" name = "email" value = {email} onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className = "password">
                Password: <input type = "password" name = "password" value = {password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button onClick = {makeUser} className="btn waves-effect waves-light" name="action">Submit
            <i className="material-icons right">send</i>
            </button>
    
        </div>
        <div className="col s3"></div>
    </div>
    );
    
    }
////////////////////////////////////////////////////////////////////////////////////////////////////

function Login() {
    const history = ReactRouterDOM.useHistory();
    const [email, setLoginEmail] = React.useState("");
    const [password, setLoginPassword] = React.useState("");
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [dataSet, setData] = React.useState("");
    const userLogin = () => {
        const user_login = {"email": email, "password": password}
        fetch('/api/login', {
            method: 'POST', 
            body: JSON.stringify(user_login),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(response => response.json())
            .then(data => {
                console.log(data)
            if (data === 'Email not found.') {
                alert('Incorrect email')
            } else if (data === "Incorrect password.")  {
                alert('Incorrect Password!')
            }
            else{
                alert("Logged in successfully") 
                setData(data);
                setLoggedIn(true);}
     
        })
    }
    if (loggedIn===true) {
        localStorage.setItem('userID', dataSet);
        return <Redirect to='/restaurant-search'/>
    }

    if (localStorage.getItem("userID")) {
        alert('Already logged in!');
        return <Redirect to='/restaurant-search'/>
    }

    return (
    <div className="login row">
        <div className = "col s3"></div>
        <div className ="col s6">
        <h4>Log in</h4> 
        <div>Email: <input type = "text" name = "email" value = {email} onChange={e => setLoginEmail(e.target.value)}></input></div>
        <div>Password: <input type = "password" name = "password" value = {password} onChange={e => setLoginPassword(e.target.value)}></input></div>
        <div class = "row">
            <button className="btn waves-effect waves-light col s4" onClick = {userLogin}>Login</button>
            <button className="btn waves-effect waves-light col s5 blue-grey lighten-3" onClick = {()=>{history.push('/restaurant-search')}}>Continue as guest</button>
        </div>
        </div>
        <div className = "col s3"></div>
    </div>
   
    );
}