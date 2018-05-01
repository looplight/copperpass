import React  from 'react';
import moment from 'moment';

const build_header = (today) => {
	let day_name;
	let header_columns = [];
	const days_in_month = 35//today.daysInMonth();
	for(let i = 0; i < /*37*/days_in_month; i++) {
		day_name = moment(today).add(i, 'days').format('ddd').toUpperCase();
		let header_row = <th className="text-center spacing" key={i}>{day_name.slice(0,1)}</th>;
		header_columns.push(header_row);
	}
	return (header_columns)
};
const build_header_month = (today) => {
	const header_columns = [];

	for(let i = 0; i < 6; i++) {
		const first  = moment(today).add(i, 'weeks').format('MMM');
		const second = moment(today).add(i+1, 'weeks').subtract(1, 'days').format('MMM');
		let month_label = first === second 
			? first
			: `${first} - ${second}`;
		
		console.log('month_label',month_label);
		let colspan = i === 0 ? 5 : 7
		//if(i === 5) colspan = 6;
		month_label = i === 0 ? '' : month_label 
		const header_row = (
				<th colSpan={colspan} className="text-center spacing" key={i}>{month_label}</th>)
		header_columns.push(header_row);
		
	}
	return (header_columns)
};

const build_header_days = (today) => {
	const header_columns_2 = [];
	const first  = parseInt(moment(today).format('D'));
	for(let i = 0; i < 36; i++) {

		const colspan = i === 0 ? 5 : 0; 
		let display_text = i === 0 ? 'Team' : moment(today).add(i-1, 'days').format('D');
		const header_row = (
		<th className="text-center spacing" colSpan={colspan}>{display_text}</th>)

		header_columns_2.push(header_row);
	}
	return (header_columns_2)	
}
//const style = {border:'1px solid black'};
const ScheduleHeaderRow = ({today}) => {

	return (
		<thead className="">
			<tr>{build_header_month(today)}</tr>
			<tr>{build_header_days(today)}</tr>
		</thead>
	)
}

export default ScheduleHeaderRow;

