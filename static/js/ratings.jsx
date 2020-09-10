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
                    let avgCovid=  (rating[1]["scores"][0] + rating[1]["scores"][1] + rating[1]["scores"][2])/3
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
                        <div className="row">
                            <h6 className="col s5"><span className="material-icons">person_outline</span>{rating[0]["user"][0]} {rating[0]["user"][1]}</h6>
                            <h6 className="col s7" style={{paddingTop:"9px"}}><StarRating rating={avgCovid} type="rate"/></h6>

                        </div>
                            <div style={{fontSize:"large"}}>
                            <p><span className="material-icons ">clean_hands</span>Cleanliness: {rating[1]["scores"][0]}/5</p>
                            <p><span className="material-icons">masks</span>Requirement of Masks: {rating[1]["scores"][1]}/5</p>
                            <p><span className="material-icons">6_ft_apart</span>Social Distancing: {rating[1]["scores"][2]}/5 </p>
                            <p><span className="material-icons">deck</span>Outdoor Seating: {outdoors} </p>
                            <p><span className="material-icons">qr_code_2</span>QR Codes to Access Menu: {codes}</p>
                            <p><span className="material-icons">sanitizer</span>Hand Sanitizer Available: {sanitizer}</p>
                            <p><span className="material-icons">chat</span>Comments: {rating[1]["scores"][6]}</p>

                            <hr></hr>
                        </div>
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
                setPosted(true);
                props.setRateRest(false);
            }
        })
    }


    if (localStorage.getItem("userID")) {
        $(document).ready(function(){
            $('select').formSelect();
          });
    return (
            <div>
            
            <div className = "row">
            <h6 className ="center" style={{fontWeight: "bold"}}>Rate {props.name} on COVID-19 Readiness</h6>
            <div className="col s4"/>
            <div className="col s4">
            <form action="#" onSubmit = {handleSubmit}>
                <div className="row">
                <div className="col s6">
                <div>
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
                <div>
                    <div  className="input-field" value = {masks} onChange = {e => setMasks(e.target.value)}>
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
                <div>
                    <div className="input-field" value = {distancing} onChange = {e => setDistancing(e.target.value)}>
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
                </div>
                <div className="col s1"></div>
                <div className="col s5">
                <div value = {outdoors} onChange = {e => setOutdoors(e.target.value)}>
                    <p>Outdoor seating:</p>
                    <p>
                        <label style={{paddingRight:"15px"}}>
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
                    <label style={{paddingRight:"15px"}}>
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
                    <label style={{paddingRight:"15px"}}>
                    <input type ="radio" name="sanitizer" value = {true}/>
                    <span>Yes</span>
                    </label>
                    <label>
                    <input type ="radio" name="sanitizer" value = {false}/>
                    <span>No</span>
                    </label>
                    </p>
                </div>
                </div>
                
                <div className="row">
                <div className=" input-field" style={{paddingTop:"0px"}} id="comments" value = {comments} onChange = {e => setComments(e.target.value)}>
                    <p className="col s12" style={{margin:"0px"}}>Comments:</p>
                    <input className = " col s12 textarea center" type="textarea" name="comments"></input>
                </div>
                </div>
                </div>
                
            <div className="row">

                <button className=" col s3 btn waves-effect waves-light center-button amber z-depth-4" onClick ={()=>{props.setRateRest(false)}}>Back</button>
                <div className="col s2"></div>
                <button className = " col s7 btn waves-effect waves-light center-button teal lighten-3 z-depth-3" type="submit">Post Rating</button>
                
            </div>

            </form>
            
            </div>
            <div className="col s4"/>

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