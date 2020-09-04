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

    let { ID, covidRating } = ReactRouterDOM.useParams();
    console.log(ID);
    console.log(covidRating);
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
            {/* <p>COVID19 Readiness Rating {covidRating}/5</p> */}
            <StarRating rating = {covidRating}/>
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
            {/* <p>COVID19 Readiness Rating {covidRating}/5</p> */}
            <StarRating rating = {covidRating}/>
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
            script.src = "https://maps.googleapis.com/maps/api/js?key="
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
