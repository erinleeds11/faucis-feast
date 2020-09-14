
function MapView(props) {
    const options = props.options;
    const ref = React.useRef();
    React.useEffect(()=> {
        const onLoad = () => {
            props.setMap(new window.google.maps.Map(ref.current, options));
        }

        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key="
            document.head.append(script);
            script.addEventListener("load", onLoad)
            return () => script.removeEventListener("load", onLoad)
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
