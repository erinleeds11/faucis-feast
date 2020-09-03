function StarRating(props){
    console.log(props.rating);
    const numberChecked = (Math.round(props.rating * 2) / 2).toFixed(1);
    console.log(numberChecked);
    if (numberChecked == .5) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star-half-alt checked half"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>          
        </div>
        )
    } else if (numberChecked == 1) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>            
        </div>
        )
    } else if (numberChecked == 1.5) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star-half-alt checked half"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>          
        </div>
        )
    } else if (numberChecked == 2) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>         
        </div>
        )
    } else if (numberChecked == 2.5) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star-half-alt checked half"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>      
        </div>
        )
    } else if (numberChecked == 3.0) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="far fa-star"></span>
            <span className="far fa-star"></span>        
        </div>
        )
    } else if (numberChecked == 3.5) {
        return  (
            <div>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star-half-alt checked half"></span>
            <span className="far fa-star"></span>           
        </div>
        )
    } else if (numberChecked == 4) {
        return  (
            <div>
            <span><img id="fauci_approved" src={'static/js/fauciApproved.png'}></img></span>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="far fa-star"></span>         
        </div>
        )
    } else if (numberChecked == 4.5) {
        return  (
            <div>
            <span><img id="fauci_approved" src={'static/js/fauciApproved.png'}></img></span>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star checked"></span>
            <span className="fas fa-star-half-alt checked half"></span>         
        </div>
        )
    } else {
        return  (
            <div>
            <span><img id="fauci_approved" src={'static/js/fauciApproved.png'}></img></span>
            COVID-19 Readiness Rating: 
            <span className="fas fa-star checked "></span>
            <span className="fas fa-star checked "></span>
            <span className="fas fa-star checked "></span>
            <span className="fas fa-star checked "></span>
            <span className="fas fa-star checked"></span>          
        </div>
        )
    }

}
