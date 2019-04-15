import React, {Component} from 'react';

/** Input field and button used inside Mapbox popup. */
class Popup extends Component {
    readInput(e) {
        this.inputValue = e.target.value;
    }

    /** The setLocation method is passed from parent and called when the Add button is clicked. */
    render() {
        const {setLocation, lngLat} = this.props;
        return (
          <div className='Popup'>
              <input type='text' value={this.inputValue} onChange={e => this.readInput(e)}/>
              <button onClick={() => setLocation(this.inputValue, lngLat)} className='addBtn'>Add</button>
          </div>
        );
    }
}

export default Popup;