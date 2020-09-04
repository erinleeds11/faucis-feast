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
            let covid = averageRating[i];
            rest_array.push(
                <div key = {i} className="row col">
                <ul id="restList">
                    <i className="fas fa-utensils"></i><button onClick = {()=>{history.push(`/restaurants/${ID}/${covid}`)}}><h3> {index}. {restData[ID]["name"]}</h3></button>
                    <h5><StarRating rating = {covid}/></h5>
                    <li id="address">Address: {restData[ID]["vicinity"]}</li>
                    {/* <li id="website">Website: <span><a href = {data[ID]["website"]}/></span></li> */}
                    <li id="googlerating">Google Rating: {restData[ID]["rating"]}/5</li>
                    {/* <li id="covidrating"><i className="fas fa-virus"></i>Covid Rating: {averageRating[i]}/5</li> */}

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
            let avg = averageRating[i];
            // let googleRating = restData[ID]["rating"];
            if (averageRating[i] >= 3.5) {
                iconColor="green";
            } else if (averageRating[i] >=3) {
                iconColor="yellow";
            }
            const current_marker = new window.google.maps.Marker({map:props.map, position: {lat: restData[ID]["geometry"]["location"]["lat"], 
                lng:restData[ID]["geometry"]["location"]["lng"]},
                title: restData[ID]["name"],
                label: index.toString(),
                icon: {url: `http://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`, scaledSize: new google.maps.Size(50, 50)}
            })
            current_marker.addListener("click", () => {history.push(`/restaurants/${ID}/${avg}`)});
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
    