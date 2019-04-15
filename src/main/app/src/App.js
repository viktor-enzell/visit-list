import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './App.css';
import Popup from './popup'

mapboxgl.accessToken = 'pk.eyJ1IjoidmlrdG9yLWVuemVsbCIsImEiOiJjanVkMmJ4OXAwdWc5NDNydnh5dWswOXBuIn0.eOW5hw_9MKZCw7OMofltlg';

/**
 * ToGo list App.
 * Lets the user save places that the user wants to visit.
 * This is done by clicking on different places on a Mapbox map.
 * The location is then saved using a Java REST API that stores location information in a MongoDB database.
 * A local list of the location names is kept in the App for the user to see saved locations.
 */
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

        /** A Mapbox map object is created. */
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom
        });

        /** A marker is added to the map but is placed outside of map to not be displayed yet. */
        this.state.marker
          .setLngLat([0, 90])
          .addTo(map);

        /** Enable moving and zooming the map. */
        map.on('move', () => {
            const {lng, lat} = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        /**
         * When the map is clicked a popup appears with the React popup component as content.
         * The setLocation function is passed to the popup component in order to access the Mapobox popup's internal HTML.
         */
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

    /**
     * Close the current marker and popup.
     * Call the API to store a new location in the database using a POST request.
     * The local list of locations is updated with the new location name.
     */
    setLocation(name, lngLat) {
        this.setState({marker: this.state.marker.setLngLat([0, 90]), popup: this.state.popup.remove()});
        fetch('/api/setLocation',
          {
              method: 'POST',
              body: JSON.stringify({
                  name: name,
                  lngLat: lngLat.lng + ',' + lngLat.lat,
              })
          })
          .then(response => response.text())
          .then(message => {
              this.setState(previousState => ({
                  locations: [...previousState.locations, name]
              }));
          });
    }

    /**
     * Close the current popup.
     * Call the API to retrieve the longitude, latitude pair of the requested location.
     */
    getLocation(name) {
        this.setState({popup: this.state.popup.remove()});
        fetch('/api/getLocation', {method: 'POST', body: name})
          .then(response => response.text())
          .then(message => {
              this.setState({marker: this.state.marker.setLngLat(message.split(','))});
          });
    }

    /**
     * Close the current marker and popup.
     * Call the API to remove the database entry with specified name.
     */
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

    /** Render the map and the list of locations. */
    render() {
        return (
          <div className='App'>
              <h1>ToGo List</h1>
              <div ref={el => this.mapContainer = el} className='map'/>
              <div>
                  {this.state.locations.map(item =>
                    <div key={item.toString()} className='location'>
                        <div className='locationName'>{item}</div>
                        <button className='delBtn' onClick={() => this.removeLocation(item.toString())}>
                            Mark as visited
                        </button>
                        <button className='viewBtn' onClick={() => this.getLocation(item.toString())}>
                            View on map
                        </button>
                    </div>
                  )}
              </div>
          </div>
        );
    }
}

export default App;
