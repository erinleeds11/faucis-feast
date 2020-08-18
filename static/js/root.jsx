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
    const [loggedIn, setLoggedIn] = React.useState(false)
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
            } else {alert("Logged in successfully") 
            setLoggedIn(true)}
    
        })
    }
    if (loggedIn===true) {
        return <Redirect to='/location-search'/>
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

function Geocoder() {
    const [address, setAddress] = React.useState("");
    const [latitude, setLat] = React.useState(0);
    const [longitude, setLong] = React.useState(0);

    const getCoords = () => {
        let latLong = []
        const address_info = {"address": address};
        fetch('/api/get_latlong', {
            method: 'POST', 
            body: JSON.stringify(address_info),
            headers: {
              'Content-Type': 'application/json'
            },
          })
        .then(response => response.json())
            .then(data => {
            if (data) {
                // console.log(data)
                console.log(data["results"][0]["geometry"]["location"]["lat"]);
                setLat(data["results"][0]["geometry"]["location"]["lat"]);
                setLong(data["results"][0]["geometry"]["location"]["lng"]);
        }})
    }

    console.log(latitude);
    console.log(longitude);

    return (
            <React.Fragment>
                <div>
                Enter location <input type = "text" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button onClick = {getCoords}>Enter</button>
                </div>
                <MapView lat={latitude} long={longitude}/>
            </React.Fragment>
    );
}

function MapView(props) {
    console.log(props);
    return (
        <div className="MapView">
            <p>lat: {props.lat}</p>
            <p>long: {props.long} </p>
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
                        <Geocoder/>
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