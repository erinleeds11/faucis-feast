const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

//protected routes

function Homepage() {
    return <div>
    </div>
}
////////////////////////////////////////////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////////////////////////////////////////

function Login() {
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
                console.log("Returned", data)
            if (data === 'Username not found') {
                alert('Incorrect email')
            } else if (data === "Password not found")  {
                alert('Incorrect Password!')
            } else {
                alert("Logged in successfully") 
                setData(data);
                setLoggedIn(true);}

     
        })
    }
    if (loggedIn===true) {
        console.log("dataSet", dataSet);
        localStorage.setItem('userID', dataSet);
        // console.log("local", localStorage.getItem('userID'));
        return <Redirect to='/restaurant-search'/>
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
////////////////////////////////////////////////////////////////////////////////////////////////////

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
                <MapView options={{center: {lat: latitude, lng: longitude}, zoom: 11}}/>
                <Restaurants lat={latitude} long={longitude}/>
            </React.Fragment>
    );
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function Restaurants(props) {
    const history = ReactRouterDOM.useHistory()

    console.log("Restaurant props", props);
    const coordinates = {"latitude": props.lat, "longitude": props.long};
    const [restaurants, setRestaurants] = React.useState([]);
    const redirectRest = () => {
        return <Redirect to="/restaurant-page"/>
    }
    React.useEffect(() => {
        fetch('/api/get-restaurants', {
            method: 'POST',
            body: JSON.stringify(coordinates),
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
            .then(data => {
                const rest_array = []
                console.log("In effect");
                for (const ID in data) {
                    console.log("Want to pass this", ID)
                    console.log(data[ID]["name"]);
                    rest_array.push(
                        <div className = "restaurantContainer">
                        <ul>
                            <button onClick = {()=>{history.push(`/restaurants/${ID}`)}}><h3> Name: {data[ID]["name"]}</h3></button>
                            <li>Address: {data[ID]["vicinity"]}</li>
                            <li>Website: <a href = {data[ID]["website"]}/></li>
                            {/* <img src = {data[item].photos[0].photo_reference}/> */}
                    
                        </ul>
                        </div>
                    );
                }
                console.log(restaurants);
                console.log("rest array:", {rest_array})
                setRestaurants(rest_array);
                })
      }, [props.lat, props.long])
            return (
                <React.Fragment>
                    <div>{restaurants}</div>
                </React.Fragment>

            );
     }

////////////////////////////////////////////////////////////////////////////////////////////////////

function RestaurantDetails() {
    const [name, setName] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [vicinity, setVicinity] = React.useState("");
    const [hours, setHours] = React.useState([]);
    const [googleRating, setGoogleRating] = React.useState(0);
    const [passID, setPassID] = React.useState("")
    const [rateRest, setRateRest] = React.useState();
    const [photo, setPhoto] = React.useState("")
    let { ID } = ReactRouterDOM.useParams();
    const rateIt =() => {
        setRateRest(true);
    }
    React.useEffect(()=> {
    fetch(`/api/restaurants/${ID}`, {
        method: 'POST',
        body: JSON.stringify(ID),
        headers: {
            'Content-Type': 'application/json'
            },
    })
    .then(response => response.json())
        .then(data => {
            setName(data["name"]);
            setWebsite(data["website"]);
            setVicinity(data["vicinity"]);
            setHours(data["hours"]);
            setGoogleRating(data["rating"])
            setPhoto(data["photos"][0]["photo_reference"])
    });
}, [])

    if (rateRest === true ) {
    return (
        <div className = "restaurant_details">
            <h1 id = "rest_name">{name}</h1>
            <Photo photoRef = {photo}/>
            <p>Website: {website}</p>
            <p>Address: {vicinity}</p>
            <p>Hours: {hours}</p>
            <p>Google Rating: {googleRating}</p>
            <button onClick  = {()=>{setRateRest(true)}}>Rate this restaurant</button>
            <WriteReview restaurantID = {ID}/>
            <button onClick = {()=>{setRateRest(false)}}>Back to reviews</button>
        
        </div>
    );
    } else {
    return (
        <div className = "restaurant_details">
            <h1 id = "rest_name">{name}</h1>
            <Photo photoRef = {photo}/>
            <p>Website: {website}</p>
            <p>Address: {vicinity}</p>
            <p>Hours: {hours}</p>
            <p>Google Rating: {googleRating}</p>
            <button onClick  = {rateIt}>Rate this restaurant</button>
            <div className = "rest_ratings"><ShowRatings restID={ID}/></div>
        
        </div>);
    }
}
function Photo(props) {
    const [photo, setPhoto] = React.useState();
    const photoRef = props.photoRef;
    const photoReference = {"photoRef": photoRef};
    fetch('/api/rest-img', {
        method: 'POST', 
        body: JSON.stringify(photoReference),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
        .then(data => {
            setPhoto(data)

    })

    return (
        <img src={photo}/>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function ShowRatings(props) {
    const restaurantID = {"restID": props.restID};
    const [ratingsList, setRatingsList] = React.useState([]);
    React.useEffect(()=> {
        fetch('/api/get-ratings', {
            method: 'POST',
            body: JSON.stringify(restaurantID),
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
            .then(data => {
                const ratings_array = []
                console.log(data)
                let i =0;
                for (const rating of data) {
                    console.log(i);
                    i=i+1;
                    // console.log("rating", rating)
                    // console.log(rating["user"])
                    // console.log("User", rating.rating_id); 
                    let outdoors;
                    if (rating[1]["scores"][3] === "true") {
                         outdoors = "Yes";
                    } else {
                         outdoors = "No";
                    }
                    ratings_array.push(
                    <div key={i}>
                        <h3>User: {rating[0]["user"][0]} {rating[0]["user"][1]}</h3>
                        <p>Cleanliness: {rating[1]["scores"][0]}</p>
                        <p>Masks: {rating[1]["scores"][1]}</p>
                        <p>Social Distancing Enforced: {rating[1]["scores"][2]} </p>
                        <p>Outdoor Seating: {outdoors} </p>
                        <p>Comments: {rating[1]["scores"][4]}</p>
                    </div>
                    );
                }
                setRatingsList(ratings_array);

        });

    }, [props.restID])

    return(
    <div>{ratingsList}</div>);

}
////////////////////////////////////////////////////////////////////////////////////////////////////

function WriteReview(props) {
    // const history = ReactRouterDOM.useHistory();
    const [cleanliness, setCleanliness] = React.useState("");
    const [masks, setMasks] = React.useState("");
    const [distancing, setDistancing] = React.useState("");
    const [outdoors, setOutdoors] = React.useState();
    const [comments, setComments] = React.useState("");
    const [posted, setPosted] = React.useState()


    console.log(cleanliness);
    console.log(masks);
    console.log(distancing);
    console.log(outdoors);
    console.log(comments);
    
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const singleRating = {"userID": localStorage.getItem("userID"),
                            "restaurantID": props.restaurantID, 
                            "cleanlinessScore": cleanliness,
                            "masksScore": masks,
                            "distancingScore": distancing,
                            "outdoorSeating": outdoors,
                            "comments": comments}  
        fetch('/api/create-rating', {
            method: 'POST',
            body: JSON.stringify(singleRating),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data === "success") {
                alert("Posted")
                setPosted(true)
            }
        })
    }

    if (localStorage.getItem("userID")) {
    return (

        <div>
            <h2>Write a review!</h2>
            <form onSubmit = {handleSubmit}>
                <div id = "cleanliness" value = {cleanliness} onChange = {e => setCleanliness(e.target.value)}>
                    Cleanliness:
                    <select name="cleanliness">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div id = "masks" value = {masks} onChange = {e => setMasks(e.target.value)}>
                    Masks:
                    <select name="masks">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div id = "distancing" value = {distancing} onChange = {e => setDistancing(e.target.value)}>
                    Social Distancing Enforced:
                    <select name="masks">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div id="outdoors" value = {outdoors} onChange = {e => setOutdoors(e.target.value)}>
                    Outdoor seating:
                    <input type ="radio" name="outdoors" value = {true}/>Yes
                    <input type ="radio" name="outdoors" value = {false}/>No
                </div>

                <div id="comments" value = {comments} onChange = {e => setComments(e.target.value)}>
                    Comments:
                    <input type="textarea" name="comments"></input>
                </div>
            
            <button type="submit">Post Rating</button>
            
            </form>

        </div>
    )

} else if (posted === true){
    return <div></div>
} else {
    alert("User not logged in")
    return <div></div>
}
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function MapView(props) {
    const options = props.options;
    console.log("Map props", props);
    const [map, setMap] = React.useState();
    const ref = React.useRef();

    React.useEffect(()=> {
        const onLoad = () => setMap(new window.google.maps.Map(ref.current, options))
        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDe3tmNZ8EkOE0JLGAJKwlHtHRZL1qKlDY"
            document.head.append(script);
            script.addEventListener("load", onLoad)
            return () => script.removeEventListener("load", onLoad)
        } else onLoad();
        }, [props.options])

    return (
        <div 
            style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
            {...{ref}}>
        </div>
    );
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function App() { 
    //make state in app set it to true
    const handleLogout = () => {
        localStorage.removeItem("userID");
        alert("Logged out successfully");
    }
    return (
        <Router>
            <div>
                <nav>
                    <h1>Fauci's Feast</h1>
                    <h3>Rate your local restaurants on Covid-19 Readiness</h3>
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
                            <Link to="/restaurant-search">Restaurant Search</Link>
                        </li>
                        <li>
                            <Link to="/" onClick ={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/signup">
                        <CreateAccount/>
                    </Route>
                    <Route path="/restaurant-search">
                        <Geocoder/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Homepage/>
                    </Route>
                </Switch>
                <Route path="/restaurants/:ID">
                        <RestaurantDetails />
                </Route>
            </div>
        </Router>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))