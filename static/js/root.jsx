const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;


////////////////////////////////////////////////////////////////////////////////////////////////////


function MapView(props) {
    const options = props.options;
    const ref = React.useRef();
    React.useEffect(()=> {
        const onLoad = () => {
            props.setMap(new window.google.maps.Map(ref.current, options));
        }

        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyATGismK6AdZmedHXcb_GtouW96ExBBwEI"
            document.head.append(script);
            script.addEventListener("load", onLoad)
            return () => script.removeEventListener("load", onLoad)
        } else {
            onLoad();
            // addMarkers(map, options["center"])
        }

        }, [props.options.center.lat, props.options.center.lng])

    function addMarkers(map, coords) {
        console.log("does this even get cllaed")
        const marker = new window.google.maps.Marker({
            map:map,
            position: coords,
    })}

    return (
        <div
            style={{ height: `120vh`, margin: `1em 0`, borderRadius: `0.5em` }}
            {...{ref}}>
        </div>
    );
}


////////////////////////////////////////////////////////////////////////////////////////////////////

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
                    <div className="nav-wrapper blue-grey lighten-3">
    
                            <a href="#" className="brand-logo">Fauci's Feast</a>
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