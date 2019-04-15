import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './App.css';
import Popup from './popup'

mapboxgl.accessToken = 'pk.eyJ1IjoidmlrdG9yLWVuemVsbCIsImEiOiJjanVkMmJ4OXAwdWc5NDNydnh5dWswOXBuIn0.eOW5hw_9MKZCw7OMofltlg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 1.5,
            locations: [],
            marker: new mapboxgl.Marker(),
            popup: null
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

        this.state.marker
          .setLngLat([0, 90])
          .addTo(map);

        map.on('move', () => {
            const {lng, lat} = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('click', (e) => {
            const placeholder = document.createElement('div');
            ReactDOM.render(<Popup setLocation={this.setLocation.bind(this)} lngLat={e.lngLat}/>, placeholder);

            this.setState({
                popup: new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setDOMContent(placeholder)
                  .addTo(map)
            });
        });
    }

    setLocation(name, lngLat) {
        this.setState({marker: this.state.marker.setLngLat([0, 90]), popup: this.state.popup.remove()});
        fetch('/api/setLocation',
          {
              method: 'POST',
              body: JSON.stringify({
                  name: name,
                  lngLat: lngLat.lng + "," + lngLat.lat,
              })
          })
          .then(response => response.text())
          .then(message => {
              this.setState(previousState => ({
                  locations: [...previousState.locations, name]
              }));
          });
    }

    getLocation(name) {
        this.setState({popup: this.state.popup.remove()});
        fetch('/api/getLocation', {method: 'POST', body: name})
          .then(response => response.text())
          .then(message => {
              console.log(message.split(","));
              this.setState({marker: this.state.marker.setLngLat(message.split(","))});
          });
    }

    removeLocation(name) {
        this.setState({marker: this.state.marker.setLngLat([0, 90]), popup: this.state.popup.remove()});
        fetch('/api/removeLocation', {method: 'DELETE', body: name})
          .then(response => response.text())
          .then(message => {
              let updatedLocations = [...this.state.locations];
              let index = updatedLocations.indexOf(name);
              if (index !== -1) {
                  updatedLocations.splice(index, 1);
                  this.setState({locations: updatedLocations});
              }
          });
    }

    render() {
        return (
          <div className="App">
              <div ref={el => this.mapContainer = el} className="map"/>
              <div>
                  {this.state.locations.map(item =>
                    <div key={item.toString()} className="location">
                        <div className="locationName">{item}</div>
                        <button className="delBtn" onClick={() => this.removeLocation(item.toString())}>Mark as
                            visited
                        </button>
                        <button className="viewBtn" onClick={() => this.getLocation(item.toString())}>View on map
                        </button>
                    </div>
                  )}
              </div>
          </div>
        );
    }
}

export default App;
