const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
//protected routes


function Homepage() {
    return <div></div>
}
function CreateAccount(props) {

    const [fname, setFirstName] = React.useState("");
    const [lname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const makeUser = () => {
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
            } else {alert('Account created!')}
            })
        }
    
    return (
    <React.Fragment>
    <div className="CreateAccount">
        <h2>Create Account</h2>
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
        <button onClick = {makeUser}>Create Account</button> 
    </div>
    </React.Fragment>
    );
    
    }
function Login() {
    const [email, setLoginEmail] = React.useState("");
    const [password, setLoginPassword] = React.useState("");

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
            if (data === 'Username not found') {
                alert('Incorred email')
            } else if (data === "Password not found")  {
                alert('Incorrect Password!')
            } else {alert("Logged in successfully")}
            })
        }
    return (
    <div>
        <h2>Log in</h2> 
        <div>Email: <input type = "text" name = "email" value = {email} onChange={e => setLoginEmail(e.target.value)}></input></div>
        <div>Password: <input type = "password" name = "password" value = {password} onChange={e => setLoginPassword(e.target.value)}></input></div>
        <button onClick = {userLogin}>Login</button>
    </div>
    );
}

function Geocode() {
    const [latitude, setLatitude] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
    const [address, setAddress] = React.useState("")

    const updateCoordinates = (e) => {
        e.preventDefault()
        const encodedAddress = encodeURI(address)

    return (
        <div>
            Enter location <input type = "text" value = {address} onChange = {e => setAddress(e.target.value)}></input>
            <button onClick = {(e) => updateCoordinates(e)}>Enter</button>
        </div>
    );
}

function App() { 
    //make state in app set it to true
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                        <li>
                            <Link to="/signup"> Create Account </Link>
                        </li>
                        <li>
                            <Link to="/login"> Log in </Link>
                        </li>
                        <li>
                            <Link to="/location-search">Location Search</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/signup">
                        <CreateAccount/>
                    </Route>
                    <Route path="/location-search">
                        <Geocode/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Homepage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))