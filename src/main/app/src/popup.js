import React, {Component} from 'react';

class Popup extends Component {
    readInput(e) {
        this.inputValue = e.target.value;
    }

    render() {
        const {setLocation, lngLat} = this.props;
        return (
          <div className='Popup'>
              <input type='text' value={this.inputValue} onChange={e => this.readInput(e)}/>
              <button onClick={() => setLocation(this.inputValue, lngLat)}>Add</button>
          </div>
        );
    }
}

export default Popup;