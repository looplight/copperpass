import React  from 'react';
import moment from 'moment';

const style = {border:'1px solid red'};
const days_in_month = 36;
const build_header = (today) => {
	let day_name;
	let header_columns = [];

	for(let i = 0; i < days_in_month; i++) {
		day_name = moment(today).add(i, 'days').format('ddd').toUpperCase();
		let header_row = <th style={style} className="text-center spacing" key={i}>{day_name.slice(0,1)}</th>;
		header_columns.push(header_row);
	}
	return (header_columns)
};
const build_header_month = (today) => {
	const header_columns = [];
	console.log('starting from today of', moment(today).format('YYYY-MM-DD'));
	header_columns.push(<th style={style} colSpan={5} className="text-center spacing">{''}</th>)
	for(let i = 0; i < 5; i++) {
		const first  = moment(today).add(i, 'weeks').format('MMM');
		const second = moment(today).add(i+1, 'weeks').subtract(1, 'days').format('MMM');
		console.log(`first: ${first}`);
		console.log(`second: ${second}`);
		let month_label = first === second 
			? first
			: `${first} - ${second}`;
		

		//let colspan = i === 0 ? 5 : 7
		let colspan = 7
		//if(i === 5) colspan = 6;
		const header_row = (
				<th style={style} colSpan={colspan} className="text-center spacing" key={i}>{month_label}</th>)
		header_columns.push(header_row);
		
	}
	return (header_columns)
};

const build_header_days = (today) => {
	const header_columns_2 = [];


	const first  = parseInt(moment(today).format('D'));
	for(let i = 0; i < days_in_month; i++) {
		const colspan = i === 0 ? 5 : 0; 
		let display_text = i === 0 ? 'Team' : moment(today).add(i-1, 'days').format('D');
		const header_row = (
		<th className="text-center spacing" colSpan={colspan}>{display_text}</th>)

		header_columns_2.push(header_row);
	}
	return (header_columns_2)	
}

const ScheduleHeaderRow = ({today}) => {

	return (
		<thead className="">
			<tr>{build_header_month(today)}</tr>
			<tr>{build_header_days(today)}</tr>
		</thead>
	)
}

export default ScheduleHeaderRow;

