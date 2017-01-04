import React 	from 'react';
import ReactDOM from 'react-dom';
import Schedule from './components/Schedule/Schedule';
import ScheduleListRow from './components/Schedule/ScheduleListRow';
import moment 	from 'moment';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
  <ScheduleListRow today={moment()} />,
  document.getElementById('root')
);
