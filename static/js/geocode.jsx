
function Geocoder() {
    const [map, setMap] = React.useState();
    const [address, setAddress] = React.useState("");
    const [latitude, setLat] = React.useState(0);
    const [longitude, setLong] = React.useState(0);
    const [restaurants, setRestaurants] = React.useState();
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
                    "hue": "#80cbc4"
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
    if ((latitude!==0) && (longitude!==0) && (restaurants === true)) {
    return (
        <div>
        <div className="container-fluid">
        <div>
            <h4 className="center">Find Local Restaurants</h4>
            <div className = "location-search row">
            <div className="col s3"/>
            <div className ="col s1">
            </div>
            <input placeholder="Enter location" id="enterLocation" type = "text" className="col s4" value = {address} onChange = {e => setAddress(e.target.value)}></input>
            <button className = "btn waves-effect waves-light amber z-depth-3" onClick = {getCoords}>search</button>
            <div className="col s4"/>
            </div>
            <div className="col s4">
                <Legend />
            </div>
        </div>
        </div>
            <div className="container-fluid">
                <div className="row">
                    <div className= "col s6" style={{paddingLeft:"50px"}}> 
                    <MapView map={map} 
                            options={{center: {lat: latitude, lng: longitude}, zoom: 10, styles: arr}}
                            setMap = {setMap} size="bigger"
                        />
                    </div>
                <div>
                <div className="col s6">
                    <Restaurants  map={map}
                        lat={latitude} 
                        long={longitude} setRestaurants={setRestaurants}/>
                </div>
                </div>
                </div>
            </div>
    </div>
        
    );

    } else if ((latitude!==0) && (longitude!==0) && (restaurants !== true)) {
        return (
            <div>
            <div className="container-fluid">
            <div>
                <h4 className="center">Find Local Restaurants</h4>
                <div className = "location-search row">
                <div className="col s3"/>
                <div className ="col s1">
                </div>
                <input placeholder="Enter location" id="enterLocation" type = "text" className="col s4" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button className = "btn waves-effect waves-light amber z-depth-3" onClick = {getCoords}>search</button>
                <div className="col s4"/>
                </div>
                <div className="col s4">
                    <Legend />
                </div>
            </div>
            </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className= "col s6" style={{paddingLeft:"50px"}}> 
                        <MapView map={map} 
                                options={{center: {lat: latitude, lng: longitude}, zoom: 10, styles: arr}}
                                setMap = {setMap} size="bigger"
                            />
                        </div>
                    <div>
                    <div className="col s6">
                        <Restaurants  map={map}
                            lat={latitude} 
                            long={longitude} setRestaurants={setRestaurants}/>
                    </div>
                    </div>
                    </div>
                </div>
        </div>
            
        );
    } else {
        return (
            <div>
            <div className="container-fluid">
            <div>
                <h4 className="center">Find Local Restaurants</h4>
                <div className = "location-search row">
                <div className="col s4"/>
                <input placeholder="Enter location" id="enterLocation" type = "text" className = "col s3" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button className = "btn-small waves-effect waves-light amber z-depth-3 col s1" onClick = {getCoords}>search</button>
                <div className="col s4"/>
                </div>
            </div>
            </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className= "col s6 offset-s3"> 
                        <MapView map={map} 
                            options={{center: {lat: 37.8272, lng: -122.2913}, zoom: 7, styles:arr}}
                            setMap = {setMap} 
                        />
                        </div>
                    <div>
                    <Restaurants  map={map}
                            lat={latitude} 
                            long={longitude}/>
                    </div>
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
        <div className="row" style={{margin:"0px"}}>
        <div className = "col s1"></div>
        <div id = "legend" className = "col s4 center" style={{margin:"0px"}}>
            COVID-19 Rating/5:
            <span><img src={green}/></span>3.5-5
            <span><img src={yellow}/></span>3-3.49
            <span><img src={red}/></span>0-2.99
        </div>
        <div className="col s1"></div>
        </div>
    )
}