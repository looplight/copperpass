import React, { Component } from 'react';
import moment               from 'moment';

class ScheduleControls extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {

  }  
  componentDidMount() {

  }
  render() {
    return (
      <div className="row justify-content-md-center unselectable">
          <div className="col text-center col-12 col-md-auto pointer">Previous</div>
          <div className="col text-center col-12 col-md-auto default-cursor">{this.props.month}</div>
          <div className="col text-center col-12 col-md-auto pointer">Next</div>
      </div>
    );
  }
}

export default ScheduleControls;
