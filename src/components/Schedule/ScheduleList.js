import React 		     from 'react';
import ScheduleListRow   from './ScheduleListRow';
import ScheduleHeaderRow from './ScheduleHeaderRow';

const ScheduleList = ({rows, today, update, event_click}) => {
	const handle_update = (data) => {
		console.log('selected range', data.ranges);
		update(data);
	}
	return (
		<table className="table schedule unselectable">
			<thead className="thead-inverse">
				<ScheduleHeaderRow today={today}/>
			</thead>				
			<tbody>
				{rows.map(row => {
					return <ScheduleListRow
						key={row.id}
						row={row}
						update={handle_update}	
						event_click={event_click}
						today={today}/>


				})}
			</tbody>
		</table>
	);
};

export default ScheduleList;
