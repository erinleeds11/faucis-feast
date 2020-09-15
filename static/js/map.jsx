
function MapView(props) {
    const options = props.options;
    const [key, setKey] = React.useState("")
    const ref = React.useRef();
    React.useEffect(()=> {
        const onLoad = () => {

            props.setMap(new window.google.maps.Map(ref.current, options));
        };
    

        if (!window.google) {
            fetch('/api/get-key', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setKey(data);
            const script = document.createElement("script");
            console.log(key)
            script.src = `https://maps.googleapis.com/maps/api/js?key=${data}`
            document.head.append(script);
            script.addEventListener("load", onLoad)
            return () => script.removeEventListener("load", onLoad)})
        } else {
            onLoad();
            // addMarkers(map, options["center"])
        }

        }, [props.options.center.lat, props.options.center.lng])

    
    return (
        <div
            style={{ height: `80vh`, margin: `1em 0`, borderRadius: `0.5em` }}
            {...{ref}}>
        </div>
    );
}
