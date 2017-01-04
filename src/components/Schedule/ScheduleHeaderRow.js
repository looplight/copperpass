import React  from 'react';
import moment from 'moment';

const build_header = (today) => {
	var number_of_days = today.daysInMonth();
	let day_name;
	let header_columns = [];

	for(let i = 0; i < number_of_days; i++) {
		day_name = moment(today).add(i, 'days').format('ddd').toUpperCase();
		let header_row = <th key={i}>{day_name.slice(0,1)}</th>;
		header_columns.push(header_row);
	}
	return (header_columns)
};

const ScheduleHeaderRow = ({today}) => {
	return (
		<tr>
			{build_header(today)}
		</tr>		
	)
}

export default ScheduleHeaderRow;