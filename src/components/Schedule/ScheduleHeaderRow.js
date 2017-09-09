import React  from 'react';
import moment from 'moment';

const build_header = (today) => {
	let day_name;
	let header_columns = [];

	for(let i = 0; i < 37; i++) {
		day_name = moment(today).add(i, 'days').format('ddd').toUpperCase();
		let header_row = <th className="text-center spacing" key={i}>{day_name.slice(0,1)}</th>;
		header_columns.push(header_row);
	}
	return (header_columns)
};
//const style = {border:'1px solid black'};
const ScheduleHeaderRow = ({today}) => {
	return (
			<tr>{build_header(today)}</tr>
	)
}

export default ScheduleHeaderRow;

