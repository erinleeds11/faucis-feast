const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
// import fauciLogo from  


function Homepage() {
    return <div>
    </div>
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateAccount(props) {
    const history = ReactRouterDOM.useHistory();
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
            } else {alert('Account created!')
                    history.push('/login')}

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
    <div>
        <h2 className = "logIn">Log in</h2> 
        <div>Email: <input type = "text" name = "email" value = {email} onChange={e => setLoginEmail(e.target.value)}></input></div>
        <div>Password: <input type = "password" name = "password" value = {password} onChange={e => setLoginPassword(e.target.value)}></input></div>
        <button onClick = {userLogin}>Login</button>
        <button onClick = {()=>{history.push('/restaurant-search')}}>Continue as guest</button>
    </div>
    );
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function Geocoder() {
    const [map, setMap] = React.useState();
    const [address, setAddress] = React.useState("");
    const [latitude, setLat] = React.useState(0);
    const [longitude, setLong] = React.useState(0);
    const arr = [
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#545454"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-87"
                },
                {
                    "lightness": "-40"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f0f0f0"
                },
                {
                    "saturation": "-22"
                },
                {
                    "lightness": "-16"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-52"
                },
                {
                    "hue": "#00e4ff"
                },
                {
                    "lightness": "-16"
                }
            ]
        }
    ];
    const getCoords = () => {
        let latLong = [];
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
                setLat(data["results"][0]["geometry"]["location"]["lat"]);
                setLong(data["results"][0]["geometry"]["location"]["lng"]);                 
        }})
    }
    if ((latitude!==0) && (longitude!==0)) {
    return (
            <div className = "container-fluid">
                <div className = "locationSearch">
                Enter location <input id="enterLocation" type = "text" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button onClick = {getCoords}>Enter</button>
                </div>
                <div>
                    <Legend />
                </div>
                <div className="row">
                    <div className="col-7">
                        <MapView map={map} 
                            options={{center: {lat: latitude, lng: longitude}, zoom: 10, styles: arr}}
                            setMap = {setMap}
                        />
                    </div>
                    <div className="col-5">
                        <Restaurants  map={map}
                            lat={latitude} 
                            long={longitude}/>
                    </div>
                </div>
            </div>
    );
    } else {
        return (
            <div className = "container-fluid">
                <div className = "locationSearch">
                Enter location <input id="enterLocation" type = "text" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button onClick = {getCoords}>Enter</button>
                </div>
                <div className="row">
                    <div className="col-7">
                        <MapView map={map} 
                            options={{center: {lat: 37.8272, lng: -122.2913}, zoom: 7, styles:arr}}
                            setMap = {setMap}
                        />
                    </div>
                    <div className="col-5">
                    </div>
                </div>
            </div>
        )
    }

}

function Legend() {
    const green = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    const yellow = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    const red = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

    return (
        <div id = "legend" className = "col-5">
            Covid-19 Rating/5:
            <span><img src={green}/></span>3.5-5
            <span><img src={yellow}/></span>3-3.49
            <span><img src={red}/></span>0-2.99
        </div>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////

function Restaurants(props) {
    const history = ReactRouterDOM.useHistory()
    const coordinates = {"latitude": props.lat, "longitude": props.long};
    const [restaurants, setRestaurants] = React.useState([]);
    const [restData, setRestData] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [googleRating, setGoogleRating] = React.useState(0);
    const [averageRating, setAverageRating] = React.useState([]);
    const [IDs, setIDs] = React.useState([]);

    React.useEffect(() => 
    { fetch('/api/get-restaurants', {
            method: 'POST',
            body: JSON.stringify(coordinates),
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
        .then(data => {
            let idList = [];
            for (const ID in data) {
                data[ID]["covidRating"]=0;}
            console.log(idList);
            setMarkers([]);
            setRestData(data); 
           
        })
        
      }, [props.lat, props.long]);

      React.useEffect(() => {
        // const newObj = {};
        let index = 1;
        const rest_array = [];
        console.log(restData);
        const idList = [];

        for (const ID in restData) {
            idList.push(ID);
        }
        console.log(idList);

        fetch('/api/get-avg-covid', {
            method: 'POST',
            body: JSON.stringify(idList),
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAverageRating(data);
    })
            
    },[restData])

    React.useEffect(()=> {
    if (averageRating.length > 0) {
        console.log(averageRating);
        let i = 0;
        const rest_array =[]
        let index = 1;
        for (const ID in restData) {
            rest_array.push(
                <div key = {i} className="row col">
                <ul id="restList">
                    <i className="fas fa-utensils"></i><button onClick = {()=>{history.push(`/restaurants/${ID}`)}}><h3> {index}. Name: {restData[ID]["name"]}</h3></button>
                    <li id="address">Address: {restData[ID]["vicinity"]}</li>
                    {/* <li id="website">Website: <span><a href = {data[ID]["website"]}/></span></li> */}
                    <li id="googlerating">Google Rating: {restData[ID]["rating"]}/5</li>
                    <li id="covidrating"><i className="fas fa-virus"></i>Covid Rating: {averageRating[i]}/5</li>
                </ul>
                </div>
            );
            index +=1;
            i +=1;
    }
    setRestaurants(rest_array);
    }}, [averageRating]);

    if ((markers.length === 0) && (restaurants.length>0) && (averageRating.length>0)) {

        let index = 1;
        let i = 0;
        for (const ID in restData) {
            let iconColor = "red";
            // let googleRating = restData[ID]["rating"];
            if (averageRating[i] >= 3.5) {
                iconColor="green";
            } else if (averageRating[i] >=3) {
                iconColor="yellow";
            }
            const current_marker = new window.google.maps.Marker({map:props.map, position: {lat: restData[ID]["geometry"]["location"]["lat"], 
                lng:restData[ID]["geometry"]["location"]["lng"]},
                title: restData[ID]["name"],
                link: "www.google.com",
                label: index.toString(),
                icon: {url: `http://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`, scaledSize: new google.maps.Size(50, 50)}
            })
            current_marker.addListener("click", () => {history.push(`/restaurants/${ID}`)});
            setMarkers(current_marker);

            index +=1;
            i +=1;
    }}

    //         console.log(data);
    return (
        <div className="rest_list">
            <div className="container">{restaurants}</div>
        </div>

    );
     }
    
////////////////////////////////////////////////////////////////////////////////////////////////////

function RestaurantDetails() {
    const [map, setMap] = React.useState();
    const [marker, setMarker] = React.useState();
    const [name, setName] = React.useState("");
    const [website, setWebsite] = React.useState("");
    const [vicinity, setVicinity] = React.useState("");
    const [hours, setHours] = React.useState([]);
    const [googleRating, setGoogleRating] = React.useState(0);
    const [rateRest, setRateRest] = React.useState();
    const [lat, setLat] = React.useState(0);
    const [lng, setLng] = React.useState(0);
    const [phone, setPhone] = React.useState();
    const arr = [
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#545454"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-87"
                },
                {
                    "lightness": "-40"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f0f0f0"
                },
                {
                    "saturation": "-22"
                },
                {
                    "lightness": "-16"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-52"
                },
                {
                    "hue": "#00e4ff"
                },
                {
                    "lightness": "-16"
                }
            ]
        }
    ];

    let { ID } = ReactRouterDOM.useParams();
    console.log(ID);
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
        console.log(data)
        setName(data["name"]);
        setWebsite(data["website"]);
        setVicinity(data["vicinity"]);
        setHours(data["opening_hours"]["weekday_text"]);
        setGoogleRating(data["rating"])
        setLat(data["geometry"]["location"]["lat"])
        setLng(data["geometry"]["location"]["lng"])
        setPhone(data["formatted_phone_number"])
        
})
    }, [ID])

    if (rateRest === true ) {
    return (
        <div className = "restaurant_details">
            <h1 id = "rest_name">{name}</h1>
            {/* <Photo photoRef = {photo}/> */}
            <p>Website: {website}</p>
            <p>Address: {vicinity}</p>
            <p>Hours: {hours}</p>
            <p>Contact: {phone}</p>
            <p>Google Rating: {googleRating}/5</p>
            <RestaurantMap map={map} marker={marker} setMarker={setMarker} setMap = {setMap} options={{center: {lat: lat, lng: lng}, zoom: 15, styles:arr}}/>
            <button onClick  = {()=>{setRateRest(true)}}>Rate this restaurant</button>
            <WriteReview restaurantID = {ID}/>
            <button onClick = {()=>{setRateRest(false)}}>Back to reviews</button>
        
        </div>
    );
    } else {
    return (
        <div className = "restaurant_details">
            <h1 id = "rest_name">{name}</h1>
            {/* <Photo photoRef = {photo}/> */}
            <p>Website: {website}</p>
            <p>Address: {vicinity}</p>
            <div>Hours:
                <p>{hours[0]}</p>
                <p>{hours[1]}</p>
                <p>{hours[2]}</p>
                <p>{hours[3]}</p>
                <p>{hours[4]}</p>
                <p>{hours[5]}</p>
                <p>{hours[6]}</p>
            </div>
            <p>Contact: {phone}</p>
            <p>Google Rating: {googleRating}/5</p>
            <RestaurantMap map={map} setMap = {setMap} setMarker={setMarker} marker={marker} options={{center: {lat: lat, lng: lng}, zoom: 15,styles:arr}}/>
            {/* <p>Covid Rating: {covidRating}</p> */}
            <button onClick  = {rateIt}>Rate this restaurant</button>
            <div className = "rest_ratings"><ShowRatings restID={ID}/></div>
        
        </div>);
    }
}
/////////////////////////////////////////////////////////////////////////////////
function RestaurantMap(props) {
    const options = props.options;
    const ref = React.useRef();
    const lat = props.options.center.lat;
    const lng = props.options.center.lng;
    const image = "https://raw.githubusercontent.com/scottdejonge/map-icons/dbf6fd7caedd60d11b5bfb5f267a114a6847d012/src/icons/restaurant.svg"
    React.useEffect(()=> {
        const onLoad = () => {
            const aMap = new window.google.maps.Map(ref.current, options);
            const aMarker = new window.google.maps.Marker({map:aMap, title :"aMarker", position: options["center"], icon: image, animation: google.maps.Animation.DROP})
            
        }
        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkDS23eZ47JUq_oWSK7AKDoaNx1bf-QE"
            document.head.append(script);
            script.addEventListener("load", onLoad)
            return () => script.removeEventListener("load", onLoad)
        } else {
            onLoad();
           

        }
    }, [props.options.center.lat, props.options.center.lng])
    
    React.useEffect(()=>{
        console.log(options["center"]);
        if ((props.map !== undefined) && (props.marker === undefined)) {
            console.log("making marker")
            props.setMarker(new window.google.maps.Marker({map:props.map, position: options["center"]}))
        }
        console.log(props.marker)
        console.log("map", props.map)
    },[props.map])

    return (
        <div className = "restaurantMap"
            style={{ height: `30vh`, width:'33%', margin: `1em 0`, borderRadius: `0.5em` }}
            {...{ref}}>
        </div>
    );
}

function ShowRatings(props) {
    const [ratingsList, setRatingsList] = React.useState([]);
    const [dataLength, setDataLength] = React.useState(0);
    let [ratingsSum, setRatingsSum] = React.useState(0);
    React.useEffect(()=> {
        fetch('/api/get-ratings', {
            method: 'POST',
            body: JSON.stringify(props.restID),
            headers: {
                'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
            .then(data => {
                console.log("ratings", data);
                const ratings_array = [];
                let i =0;
                // setDataLength(data.length);
                const length = data.length;
                setDataLength(length)
                let sumRate =0;
                for (const rating of data) {
                    console.log("rating", rating)
                    i=i+1; 
                    let outdoors;
                    let codes;
                    let sanitizer;
                    if (rating[1]["scores"][3] == true) {
                         outdoors = "Yes";
                    } else {
                         outdoors = "No";
                    }
                    if (rating[1]["scores"][4] == true) {
                        codes = "Yes";
                   } else {
                        codes = "No";
                   }
                   if (rating[1]["scores"][5] == true) {
                    sanitizer = "Yes";
                    } else {
                    sanitizer = "No";
                    }
                    sumRate += rating[1]["scores"][0] + rating[1]["scores"][1] + rating[1]["scores"][2];
                    setRatingsSum(sumRate/3)
                    ratings_array.push(
                    <div key={i}>
                        <h5><i className="far fa-user">{rating[0]["user"][0]} {rating[0]["user"][1]}</i></h5>
                        <p>Cleanliness: {rating[1]["scores"][0]}/5</p>
                        <p><i className="fas fa-head-side-mask">Requirement of Masks: {rating[1]["scores"][1]}/5</i></p>
                        <p>Social Distancing: {rating[1]["scores"][2]}/5 </p>
                        <p>Outdoor Seating: {outdoors} </p>
                        <p>QR Codes to Access Menu: {codes}</p>
                        <p>Hand Sanitizer Available: {sanitizer}</p>
                        <p>Comments: {rating[1]["scores"][4]}</p>
                    </div>
                    );
                }
                setRatingsList(ratings_array);
                

        });

    }, [props.restID])
    // setCovidRating((ratingsSum/dataLength).toFixed(2));

    return(
    <div>
        <p><i className="fas fa-virus"></i>Average COVID-19 Readiness Rating: {(ratingsSum/dataLength).toFixed(2)}/5</p>
        <div>{ratingsList}</div>
        
    </div>);

}
////////////////////////////////////////////////////////////////////////////////////////////////////

function WriteReview(props) {
    // const history = ReactRouterDOM.useHistory();
    const [cleanliness, setCleanliness] = React.useState("");
    const [masks, setMasks] = React.useState("");
    const [distancing, setDistancing] = React.useState("");
    const [outdoors, setOutdoors] = React.useState();
    const [codes, setCodes] = React.useState();
    const [sanitizer, setSanitizer] = React.useState();
    const [comments, setComments] = React.useState("");
    const [posted, setPosted] = React.useState()
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const singleRating = {"userID": localStorage.getItem("userID"),
                            "restaurantID": props.restaurantID, 
                            "cleanlinessScore": cleanliness,
                            "masksScore": masks,
                            "distancingScore": distancing,
                            "outdoorSeating": outdoors,
                            "handSanitizer":sanitizer,
                            "qrCodes":codes,
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
                    Social Distancing:
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
                <div id="codes" value = {codes} onChange = {e => setCodes(e.target.value)}>
                    QR Codes to Access Menu:
                    <input type ="radio" name="codes" value = {true}/>Yes
                    <input type ="radio" name="codes" value = {false}/>No
                </div>
                <div id="sanitizer" value = {sanitizer} onChange = {e => setSanitizer(e.target.value)}>
                    Hand Sanitizer Available:
                    <input type ="radio" name="sanitizer" value = {true}/>Yes
                    <input type ="radio" name="sanitizer" value = {false}/>No
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
    return <div/>
}
}
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
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkkDS23eZ47JUq_oWSK7AKDoaNx1bf-QE"
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
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-static-top collapse navbar-collapse">
                        <ul className ="navbar-nav">
                            {/* <li>
                                <img className = "logo" alt="logo" src={'static/js/logo.png'}/>
                            </li> */}
                            <li className="nav-item">
                                <h4>Fauci's Feast</h4>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/"> Home </Link>
                            </li>
                            <li className="nav-item"> 
                                <Link className="nav-link" to="/signup"> Create Account </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login"> Log in </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/restaurant-search">Restaurant Search</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick ={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h1 id="top"><span><img id="big_logo" src={'static/js/logo.png'}/></span>Fauci's Feast</h1>
                <h3>Rate your local restaurants on Covid-19 Readiness</h3>
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
                    <Route path="/restaurants/:ID">
                        <RestaurantDetails/>
                    </Route>
                    <Route path="/">
                        <Geocoder/>
                        <Homepage/>
                        
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


ReactDOM.render(<App />, document.getElementById('root'))