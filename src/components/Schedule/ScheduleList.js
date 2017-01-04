import React from 'react';
import ScheduleListRow from './ScheduleListRow';
import ScheduleHeaderRow from './ScheduleHeaderRow';

const handle_cell_drag = (start_index, stop_index) => {
	return;
}

const ScheduleList = ({users, today}) => {
	return (
		<table className="table">
			<thead>
				<ScheduleHeaderRow today={today}/>
			</thead>				
			<tbody>
				{users.map(user => {
					return <ScheduleListRow
						key={user.id}
						user={user}
						today={today}
						handle_cell_drag={handle_cell_drag}/>
				})}
			</tbody>
		</table>
	);
};

export default ScheduleList;