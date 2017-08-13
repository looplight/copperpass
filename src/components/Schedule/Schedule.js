import React, { Component } from 'react';
import ScheduleList         from './ScheduleList';
import moment               from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    console.log('Soon we are mounted!');
  }  
  componentDidMount() {
    console.log('Mounted!');
  }
  render() {
    return (
      <div className="container">
        <ScheduleList
          rows={this.props.rows}
          today={this.props.today}
          update={this.props.update}
          event_click={this.props.event_click}
        />
      </div>
    );
  }
}

export default Schedule;
