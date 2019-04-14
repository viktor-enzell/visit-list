import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlrdG9yLWVuemVsbCIsImEiOiJjanVkMmJ4OXAwdWc5NDNydnh5dWswOXBuIn0.eOW5hw_9MKZCw7OMofltlg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 1.5,
        };
    }

    componentDidMount() {
        const {lng, lat, zoom} = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        map.on('move', () => {
            const {lng, lat} = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('click', (e) => {
            const marker = new mapboxgl.Marker()
              .setLngLat(e.lngLat)
              .addTo(map);
        });
    }

    hello = () => {
        this.setState({message: "New Hello!"});
        /*
        fetch('/api/hello')
          .then(response => response.text())
          .then(message => {
              this.setState({message: message});
          });
         */
    };

    render() {
        return (
          <div className="App">
              <div ref={el => this.mapContainer = el} className="map"/>
          </div>
        );
    }
}

export default App;
