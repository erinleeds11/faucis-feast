
 

function Homepage() {
    const history = ReactRouterDOM.useHistory();
    const redirectRest=()=> {
        history.push('/restaurant-search');
    }
    $(document).ready(function(){
        $('.carousel').carousel({
            dist:0,
            numVisible:6,
            padding: .5,
            indicators:true,
        })
      });
 

    return (
        <div>
     <div className="title">
        <h3 className="center padding">Fauci's Feast</h3>
        <h5 className="center">Rate Your Local Restaurants on COVID-19 Readiness</h5>
        <button className="waves-effect waves-light btn amber center-button z-depth-3" onClick = {redirectRest}>Find restaurants</button>
    </div>
    <div className="carousel">
        <a className="carousel-item" ><img src="static/images/covid5.png"/></a>
        <a className="carousel-item" ><img src="static/images/covi13.png"/></a>
        <a className="carousel-item" ><img src="static/images/covid8.png"/></a>
        <a className="carousel-item" ><img src="static/images/covid4.png"/></a>
        <a className="carousel-item" ><img src="static/images/covid2.png"/></a>
        <a className="carousel-item"><img src="static/images/covid6.png"/></a>
        <a className="carousel-item" ><img src="static/images/covid3.png"/></a>

  </div>
        </div>);
}       
////////////////////////////////////////////////////////////////////////////////////////////////////

function CreateAccount(props) {
    const history = ReactRouterDOM.useHistory();
    const [fname, setFirstName] = React.useState("");
    const [lname, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const makeUser = () => {
        if ((fname !== undefined) && (lname !== undefined) && (email !== undefined) && (password !== undefined)) {
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
                } else if (data=== "ok") {
                    alert('Account created!')
                    history.push('/login')
                } 
                })
    } else {
        alert("Invalid entry.")
    }
}
    
    return (
    <div className= "bg-image">
    <div className =  "row ">
        <div className="row padding"></div>
        <div className="col s4"></div>
        <div className="col s4 text-box">
            <h4 className="center padding-btm-2"><i class="medium material-icons">person_add</i>    Create Account</h4>
            <div className = "firstName">
                <p className="bold">First Name: <input type = "text" name = "fname" value = {fname} onChange={e => setFirstName(e.target.value)}></input></p>
            </div>
            <div className = "lastName">
                <p className="bold">Last Name: <input type = "text" name = "lname" value = {lname} onChange={e => setLastName(e.target.value)}></input></p>
            </div>
            <div className = "email">
                <p className="bold">Email: <input type = "text" name = "email" value = {email} onChange={e => setEmail(e.target.value)}></input></p>
            </div>
            <div className = "password">
                <p className = "bold">Password: <input type = "password" name = "password" value = {password} onChange={e => setPassword(e.target.value)}></input></p>
            </div>
            <button onClick = {makeUser} className="btn waves-effect waves-light center-button amber z-depth-3" name="action">Submit
            <i className="material-icons right">send</i>
            </button>
            <div className="padding-btm"></div>
    
        </div>
        <div className="col s4"></div>
        </div>
        </div>
    
    

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
    <div className="bg-image">
    <div className="row">
        <div className="row padding-big"></div>
        <div className = "col s4"></div>
        <div className ="col s4 text-box">
        <h4 className="center padding-btm"><i class="medium material-icons">person</i>   Login</h4> 
        <div className="bold">Email: <input type = "text" name = "email" value = {email} onChange={e => setLoginEmail(e.target.value)}></input></div>
        <div className="bold">Password: <input type = "password" name = "password" value = {password} onChange={e => setLoginPassword(e.target.value)}></input></div>
        
        <div className="container">
            <div className="row"><button className="btn waves-effect waves-light center-button amber z-depth-3" onClick = {userLogin}>Login</button></div>
            <div className="row center"><p></p></div>
            <div className="row "><button className="btn waves-effect waves-light teal lighten-3 center-button z-depth-3" onClick = {()=>{history.push('/restaurant-search')}}>Continue as guest</button></div>
        </div>
        </div>
        <div className = "col s4"></div>
    </div>
    </div>
   
    );
}