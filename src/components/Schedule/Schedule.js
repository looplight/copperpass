import React, { Component } from 'react';
import ScheduleList         from './ScheduleList';
import moment               from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rows: this.props.rows,
        today: this.props.today,
        events: [
          {user_id:1, range:{from:'2017-01-01',to:'2017-01-07'}}
        ]
    };
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
          rows={this.state.rows}
          today={this.state.today}
          on_save={this.props.on_save}
        />
      </div>
    );
  }
}

export default Schedule;
