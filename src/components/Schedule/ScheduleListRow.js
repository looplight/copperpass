import React, { Component }  from 'react';
import moment 				 from 'moment';
import ScheduleListDay 		 from './ScheduleListDay';
const is_weekend = date => {
	return date.day() % 6 === 0;
}

class ScheduleListRow extends Component {
	constructor(props) {
		super(props);
		this._handle_mouse_click = this._handle_mouse_click.bind(this)
		this.state = {
      		mouse_down: false,
      		start_selection: undefined,
      		end_selection: undefined,
      		events: [
      			{from:'2017-01-01', to:'2017-01-05'}
      		],
      		data: [],
      		selected_days: []
    	};
	}

	componentDidMount() {
		this.setState({
			data: this._build_columns(this.props.today)
		});
	}
	_build_columns(today) {
		let days_in_month = today.daysInMonth();
		let day_columns = [];
		for(let i = 0; i < days_in_month; i++) {
			let day = moment(today).add(i, 'day');
			//let full_day_text = day.format('YYYY-MM-DD');
			let day_text = day.format('D');
			if(is_weekend(day)) {
				day_columns.push(<ScheduleListDay key={i} className="weekend" display_text={day_text} is_selected={false} handle_mouse_click={this._handle_mouse_click}/>)
			} else {
				day_columns.push(<ScheduleListDay key={i} display_text={day_text} handle_mouse_click={this._handle_mouse_click} />);
			}
		}
		return day_columns;
	}

	_handle_mouse_click(display_text) {
		// gör om, gör rätt
		this.setState((prev_state, props) => {
			let data_copy = prev_state.data.slice();
			let found = this.state.data.find((day) => {
				return day.props.display_text === display_text;
			});

			let index = data_copy.indexOf(found);
			data_copy.splice(index,1);
			return {
				data: data_copy
			}
		});
	}
  	render() {
  		return (
  			<table className="table">
  				<tbody>
  					<tr>{this.state.data}</tr>
  				</tbody>
  			</table>
  	)}
}

export default ScheduleListRow;