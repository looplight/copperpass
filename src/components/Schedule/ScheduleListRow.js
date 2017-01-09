import React, { Component }  from 'react';
import moment 				 from 'moment';
import ScheduleListDay 		 from './ScheduleListDay';
import on_click_outside      from 'react-onclickoutside';
const is_weekend = date => {
	return date.day() % 6 === 0;
}

class ScheduleListRow extends Component {
	constructor(props) {
		super(props);
		this._handle_mouse_click = this._handle_mouse_click.bind(this);
		this._handle_mouse_enter = this._handle_mouse_enter.bind(this)
		this._handle_mouse_down  = this._handle_mouse_down.bind(this);
		this._handle_mouse_up    = this._handle_mouse_up.bind(this);
		this.state = {
      		is_mouse_down: false,
      		start_selection: undefined,
      		end_selection: undefined,
      		events: [
      			{start:'2017-01-01', end:'2017-01-05'}
      		],
      		days: [],
      		selected_days: []
    	};
	}

	componentDidMount() {
		this.setState({
			days: this._build_columns(this.props.today)
		});
	}

	_build_columns(today) {
		const days_in_month = today.daysInMonth();
		const days = [];
		for(let i = 0; i < days_in_month; i++) {
			const day = moment(today).add(i, 'day');
			//let full_day_text = day.format('YYYY-MM-DD');
			const day_text = day.format('D');

			//TODO(daniel): refactor tout this duplication
			if(is_weekend(day)) {
				days.push({
					id:i,
					is_weekend:true,
					display_text:day_text,
					is_selected:false,
					handle_mouse_click:this._handle_mouse_click,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down
				});
			} else {
				days.push({
					id:i,
					is_weekend:false,
					display_text:day_text,
					is_selected:false,
					handle_mouse_click:this._handle_mouse_click,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down
				});
			}
		}
		return days;		
	}

	_handle_mouse_click(display_text) {
		this.setState((prev_state, props) => {
			const days_copy = prev_state.days.slice();
			const found = days_copy.find((day) => {
				return day.display_text === display_text;
			});
			if(!found) return prev_state;
			found.is_selected = true;
			
			return {
				days: days_copy
			}
		});		
	};

	_handle_mouse_enter(display_text) {
		if(!this.state.is_mouse_down) return
		this.setState((prev_state, props) => {
			const days_copy = prev_state.days.slice();
			const found = days_copy.find((day) => {
				return day.display_text === display_text;
			});
			if(!found) return prev_state;
			found.is_selected = true;
			
			return {
				days: days_copy
			}
		});				
	}	
	_handle_mouse_down(event) {
		event.preventDefault();
		this.setState( (prev_state, props) => {
			return {
				is_mouse_down: true
			}
		});
	};

	_handle_mouse_up() {
		this.setState( (prev_state, props) => {
			return {
				is_mouse_down:false
			}
		});
	};
	handleClickOutside() {
		this.setState( (prev_state, props) => {
			return {
				is_mouse_down:false
			}
		});
  	}

  	render() {
  		const days = this.state.days.map((day) => {
  			return <ScheduleListDay 
	  			key={day.id}
	  			is_weekend={day.is_weekend}
	  			display_text={day.display_text}
	  			is_selected={day.is_selected}
	  			handle_mouse_click={day.handle_mouse_click}
	  			handle_mouse_enter={day.handle_mouse_enter}
  			/>
  		});
  		return (
  			<table className="table schedule">
  				<tbody>
  					<tr onMouseDown={this._handle_mouse_down} onMouseUp={this._handle_mouse_up}>{days}</tr>
  				</tbody>
  			</table>
  	)}
}

export default on_click_outside(ScheduleListRow);



