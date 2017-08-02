import React 	from 'react';
import ReactDOM from 'react-dom';
import Schedule from './components/Schedule/Schedule';
import ScheduleListRow from './components/Schedule/ScheduleListRow';
import ScheduleHeaderRow    from './components/Schedule/ScheduleHeaderRow';
import moment 	from 'moment';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
    <div>
        <ScheduleListRow eventTypes="mouseup" today={moment() } />,
  </div>,
  document.getElementById('root')
);
