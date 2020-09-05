const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

function App() { 
    //make state in app set it to true
    const history = ReactRouterDOM.useHistory();

    const handleLogout = () => {
        if (!localStorage.getItem("userID")) {
            alert("User not logged in")
            history.push('/')
        } else {
            localStorage.removeItem("userID");
            alert("Logged out successfully");
        }
    }
    return (
        <Router>
            <div className= "navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                            {/* <img className = "logo-nav" src="static/images/logo.png"/> */}
                            <a className="brand-logo">Fauci's Feast</a>
                            <ul className ="right">
                            <li>
                                <Link  to="/" style={{textDecoration: "none"}}><i className="fas fa-home"></i></Link>
                            </li>
                            <li>
                                <Link  to="/restaurant-search" style={{textDecoration: "none"}}><i className="fas fa-search"></i></Link>
                            </li>
                            <li > 
                                <Link  to="/signup" style={{textDecoration: "none"}}> Create Account </Link>
                            </li>
                            <li>
                                <Link  to="/login" style={{textDecoration: "none"}}> Log in </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/restaurant-search">Restaurant Search</Link>
                            </li> */}
                            <li>
                                <Link  to="/" style={{textDecoration: "none"}} onClick ={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
            <div>
                <Switch>
                    <Route path="/signup">
                        <CreateAccount/>
                    </Route>
                    {/* <Route path="/restaurant-search">
                        <Geocoder/>
                    </Route> */}
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/restaurants/:ID/:covidRating">
                        <RestaurantDetails/>
                    </Route>
                    <Route path ="/restaurant-search">
                        <Geocoder/>
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