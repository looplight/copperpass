import React, { Component } from 'react';
import ScheduleList from './ScheduleList';
import moment from 'moment';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [{id:1}, {id:2}],
        today: moment(),
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
          users={this.state.users}
          today={this.state.today}
        />
      </div>
    );
  }
}

export default Schedule;
