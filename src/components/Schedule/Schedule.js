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
          rows={this.props.rows} // contains the events
          today={this.props.today}
          on_save={this.props.on_save}
          on_event_click={this.props.on_event_click}
        />
      </div>
    );
  }
}

export default Schedule;
