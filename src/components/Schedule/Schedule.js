import React, { Component } from 'react';
import ScheduleList         from './ScheduleList';

class Schedule extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
  }  
  componentDidMount() {
  }

  render() {
    return (
      <div className="">
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