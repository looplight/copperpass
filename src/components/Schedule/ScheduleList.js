import React 		     from 'react';
import ScheduleListRow   from './ScheduleListRow';
import ScheduleHeaderRow from './ScheduleHeaderRow';

const ScheduleList = ({rows, today}) => {
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
						today={today}/>
				})}
			</tbody>
		</table>
	);
};

export default ScheduleList;
