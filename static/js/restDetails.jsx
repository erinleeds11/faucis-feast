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
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });
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

    let { ID, covidRating } = ReactRouterDOM.useParams();
    console.log(ID);
    console.log(covidRating);
    const rateIt =() => {
        if (localStorage.getItem("userId") !== undefined) { 
            setRateRest(true);
        } else {
            alert("Login to rate this restaurant")
        }
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
                <h3 className ="center" id = "rest_name">{name}</h3>
                <h6 className="center"><StarRating rating = {covidRating} type="list"/></h6>
                <hr></hr>
                <div className="row">
                    <div >
                        <WriteReview setRateRest = {setRateRest} name = {name} restaurantID = {ID}/>                </div>
                </div>
                </div>
            
            );
    
    } else {
    return (
        <div className = "restaurant_details">
            <h3 className ="center" id = "rest_name">{name}</h3>
            <div className="row" style={{marginBottom:"0px"}}>
                <div className="col s3"/>
                <div className="col s6">
            <div className="row" style={{marginBottom:"0px"}}>
            <h6 className="center col s8"><StarRating rating = {covidRating} type="list"/></h6>
            <button style={{padding:"0px"}} className ="col s4 btn waves-effect waves-light center-button teal lighten-3 z-depth-3" onClick = {rateIt}>Rate {name}</button>
            </div>
            </div>
            <div className="col s3"/>
            </div>
            <hr style={{margin:"0px"}}></hr>
            <div className="row" style={{fontSize:"large"}}>
                <div className="col s4">
                    <div>

                    <a href={website}><span class="material-icons">link</span>Website</a>
                    <p><span class="material-icons">phone</span>{phone}</p>
                    </div>
                    <div className ="hours center"><h6><span class="material-icons">access_time</span>Hours</h6>
                        <p>{hours[0]}</p>
                        <p>{hours[1]}</p>
                        <p>{hours[2]}</p>
                        <p>{hours[3]}</p>
                        <p>{hours[4]}</p>
                        <p>{hours[5]}</p>
                        <p>{hours[6]}</p>
                    </div>
                </div>
                <div className="col s4">
                    <p className="center"><span class="material-icons">location_on</span>{vicinity}</p>
                    <RestaurantMap map={map} setMap = {setMap} setMarker={setMarker} marker={marker} options={{center: {lat: lat, lng: lng}, zoom: 15,styles:arr}}/>
                </div>

                <div className = "rest_ratings col s4">
                <h5 className ="center"style={{fontWeight: "bolder"}}> Reviews</h5>
                    <div id="ratings">
                        <ShowRatings restID={ID}/>
                    </div>
                </div>
            </div>
            </div>
            
        
        );
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
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyATGismK6AdZmedHXcb_GtouW96ExBBwEI"
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
            style={{ height: `60vh`, width:'100%', margin: `1em 0`, borderRadius: `0.5em` }}
            {...{ref}}>
        </div>
    );
}
