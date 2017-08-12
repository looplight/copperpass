import React 	from 'react';
import ReactDOM from 'react-dom';
import Schedule from './components/Schedule/Schedule';
import ScheduleListRow from './components/Schedule/ScheduleListRow';
import ScheduleHeaderRow    from './components/Schedule/ScheduleHeaderRow';
import moment 	from 'moment';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rows = [{id:1, title:'Daniel', subtitle:'code monkii 1', events: [
                {start:'2017-08-21', end:'2017-08-25'},
                {start:'2017-08-14', end:'2017-08-18'}]},
            {id:2, title:'Peter', subtitle:'code monkii 2', events: [
                {start:'2017-08-07', end:'2017-08-11'}]},
                ];

const handle_save = (selected_ranges) => {

}

const on_event_click = (event) => {
    
}

ReactDOM.render(
    <Schedule rows={rows} today={moment() } />,
    document.getElementById('root')
);
