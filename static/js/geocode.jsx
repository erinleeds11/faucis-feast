
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
    if ((latitude!==0) && (longitude!==0)) {
    return (
            <div className="container-fluid">
                <div className = "locationSearch row">
                Enter location <input id="enterLocation" type = "text" className = "col s7" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                </div>
                <button onClick = {getCoords}>Enter</button>
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
                <h4 className="center">Find Local Restaurants</h4>
                <p className="center">Enter Location</p>
                <div className = "location-search row">
                <div className="col s2"/>
                 <i class="fas fa-search-location style={{size: 6x}}"></i>
                </div>
                <input id="enterLocation" type = "text" className="col s6" value = {address} onChange = {e => setAddress(e.target.value)}></input>
                <button onClick = {getCoords}>search</button>
                <div className="col s3"/>
                </div>
    
                <div className="row">
                    <div className="col-s7">
                        <MapView map={map} 
                            options={{center: {lat: 37.8272, lng: -122.2913}, zoom: 7, styles:arr}}
                            setMap = {setMap}
                        />
                    </div>
                    <div className="col-s5">
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