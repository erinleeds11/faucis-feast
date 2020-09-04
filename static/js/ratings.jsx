function ShowRatings(props) {
    const [ratingsList, setRatingsList] = React.useState([]);
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
                    ratings_array.push(
                    <div key={i}>
                        <h5><i className="far fa-user">{rating[0]["user"][0]} {rating[0]["user"][1]}</i></h5>
                        <p>Cleanliness: {rating[1]["scores"][0]}/5</p>
                        <p><i className="fas fa-head-side-mask">Requirement of Masks: {rating[1]["scores"][1]}/5</i></p>
                        <p>Social Distancing: {rating[1]["scores"][2]}/5 </p>
                        <p>Outdoor Seating: {outdoors} </p>
                        <p>QR Codes to Access Menu: {codes}</p>
                        <p>Hand Sanitizer Available: {sanitizer}</p>
                        <p>Comments: {rating[1]["scores"][6]}</p>
                    </div>
                    );
                }
                setRatingsList(ratings_array);
                

        });

    }, [props.restID])
    // setCovidRating((ratingsSum/dataLength).toFixed(2));

    return(
    <div>
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
    const [posted, setPosted] = React.useState();

  
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
        $(document).ready(function(){
            $('select').formSelect();
          });
    return (
            <div>
            <h4>Write a review!</h4>
            <div className = "row">
            <form action="#" onSubmit = {handleSubmit}>
                <div className= "col s4">
                    <div className="input-field" value = {cleanliness} onChange = {e => setCleanliness(e.target.value)}>
                        Cleanliness
                        <select>
                            <option value="" disabled selected>/5</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className= "col s4">
                    <div  className="input-field s4" value = {masks} onChange = {e => setMasks(e.target.value)}>
                        Masks:
                        <select className="masks">
                            <option value="" disabled selected>/5</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className= "col s4">
                    <div className="input-field s4" value = {distancing} onChange = {e => setDistancing(e.target.value)}>
                        Social Distancing:
                        <select >
                            <option value="" disabled selected>/5</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div value = {outdoors} onChange = {e => setOutdoors(e.target.value)}>
                    Outdoor seating:
                    <p>
                        <label>
                        <input type ="radio" name="outdoors" value = {true}/>
                        <span>Yes</span>
                        </label>
                        <label>
                        <input type ="radio" name="outdoors" value = {false}/>
                        <span>No</span>
                        </label>
                    </p>
                </div>

                <div value = {codes} onChange = {e => setCodes(e.target.value)}>
                    QR Codes to Access Menu:
                    <p>
                    <label>
                    <input type ="radio" name="codes" value = {true}/>
                    <span>Yes</span>
                    </label>
                    <label>
                    <input type ="radio" name="codes" value = {false}/>
                    <span>No</span>
                    </label>
                    </p>
                </div>
                <div value = {sanitizer} onChange = {e => setSanitizer(e.target.value)}>
                    Hand Sanitizer Available:
                    <p>
                    <label>
                    <input type ="radio" name="sanitizer" value = {true}/>
                    <span>Yes</span>
                    </label>
                    <label>
                    <input type ="radio" name="sanitizer" value = {false}/>
                    <span>No</span>
                    </label>
                    </p>
                </div>

                <div className="input-field" id="comments" value = {comments} onChange = {e => setComments(e.target.value)}>
                    <p>Comments:</p>
                    <input className = "textarea" type="textarea" name="comments"></input>
                </div>
            
            <button type="submit">Post Rating</button>
            
            </form>

        </div>
        </div>
    )

} else if (posted === true){
    return <div></div>
} else {
    alert("User not logged in")
    return <div/>
}
}