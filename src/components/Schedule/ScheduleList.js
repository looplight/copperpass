import React 		     from 'react';
import ScheduleListRow   from './ScheduleListRow';
import ScheduleHeaderRow from './ScheduleHeaderRow';

const ScheduleList = ({rows, today, update, event_click}) => {
	const handle_update = (data) => {
		update(data);
	}
	return (
		<table className="schedule unselectable">
				<ScheduleHeaderRow today={today}/>
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
