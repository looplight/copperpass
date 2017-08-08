import React, { Component }  from 'react';
import moment 				 from 'moment';
import ScheduleListDay 		 from './ScheduleListDay';
import Button 		 		 from '../Common/Button';
import ReactDOM 			 from 'react-dom';
import _ 					 from 'lodash';

class ScheduleListRow extends Component {
	constructor(props) {
		super(props);
		this._handle_mouse_down 		 = this._handle_mouse_down.bind(this);
		this._handle_mouse_enter 		 = this._handle_mouse_enter.bind(this)
		this._handle_mouse_up    		 = this._handle_mouse_up.bind(this);
		this._handle_mouse_leave		 = this._handle_mouse_leave.bind(this);
		this._handle_save		 		 = this._handle_save.bind(this);

		//NOTE(daniel): maybe some of these should be received via props?
		this.state = {
      		is_mouse_down: false, // is selecting
      		is_starting_on_selected_day: undefined,
      		start_selection: undefined,
      		end_selection: undefined,
      		events: props.row.events,
      		days: [],
      		selected_days: []
    	};
	}

	componentDidMount() {
		document.addEventListener('mouseup', this.handle_click_outside.bind(this), true);	
		this.setState({
			days: this._build_columns(this.props.today)
		});
	}

	componentWillUnmount() {
	    document.removeEventListener('mouseup', this.handle_click_outside.bind(this), true);		
	}

	handle_click_outside(event) {
		const domNode = ReactDOM.findDOMNode(this);
		console.log('domNode',domNode);
		console.log('event.target',event.target);
	    if ((!domNode || !domNode.contains(event.target))) {
	    	console.log('Around the outside!')
	    	
			this.setState( (prev_state, props) => {
				return {
					is_mouse_down:false
				}
			});	    	
	    }		
	}

	_build_columns(today) {
		const is_weekend = date => {
			return date.day() % 6 === 0;
		}

		const is_event = date => {
			//check state.events for a range containing 'date'
			const found_in_event = _.find(this.state.events, event => moment(date.format('YYYY-MM-DD')).isBetween(moment(event.start), moment(event.end), null, '[]'));
			return !!found_in_event;
		}
		// id day is in an event range, mark it as an event with correct class and event id (?)
		const days_in_month = today.daysInMonth();
		const days = [];
		for(let i = 0; i < days_in_month; i++) {
			const day = moment(today).add(i, 'day');
			//let full_day_text = day.format('YYYY-MM-DD');
			const day_text = day.format('D');

			//TODO(daniel): refactor out this duplication
			if(is_weekend(day)) {
				days.push({
					id:i,
					is_weekend:true,
					display_text:day_text,
					date: day.format('YYYY-MM-DD'),
					is_selected:false,
					is_event: is_event(day),
					handle_mouse_click:this._handle_mouse_down,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down,
					handle_mouse_up: this._handle_mouse_up,
					
				});
			} else {
				days.push({
					id:i,
					is_weekend:false,
					display_text:day_text,
					date: day.format('YYYY-MM-DD'),
					is_selected:false,
					is_event: is_event(day),
					handle_mouse_click:this._handle_mouse_down,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down,
					handle_mouse_up: this._handle_mouse_up,
					
				});
			}
		}
		return days;		
	}

	_handle_mouse_down(display_text, date, event) {
		event.preventDefault();
		this.setState((prev_state, props) => {
			const days_copy = prev_state.days.slice();
			const found = days_copy.find((day) => {
				return day.display_text === display_text;
			});
			if(!found || found.is_event) return prev_state;
			found.is_selected = !found.is_selected;
			
			return {
				days: days_copy,
				is_mouse_down:true,
				is_starting_on_selected_day: !found.is_selected // invert it again so that we get the orignal state of the selection
			}
		});		
	};

	_handle_mouse_enter(display_text) {
		if(!this.state.is_mouse_down) return;
		this.setState((prev_state, props) => {
			const days_copy = prev_state.days.slice();
			const found = days_copy.find((day) => {
				return day.display_text === display_text;
			});
			if(!found || found.is_event) return prev_state;
			
			if(!this.state.is_starting_on_selected_day && found.is_selected) {
				found.is_selected = true;	
			} 
			else if(this.state.is_starting_on_selected_day && found.is_selected) {
				found.is_selected = false;
			}
			else {
				found.is_selected = !this.state.is_starting_on_selected_day && !found.is_selected ? !found.is_selected : found.is_selected;
			}
			return {
				days: days_copy,
			}
		});				
	}	
	_handle_mouse_leave(display_text, event) {
		return;
		if(!this.state.is_mouse_down) return;
		this.setState( (prev_state, props) => {
			const days_copy = this.state.days.slice();
			const selected_days = days_copy.filter(day => day.is_selected === true);

			selected_days.map(day => day.is_selected = false);
			
			return {
				days:days_copy
			}
		});		
	}

	_handle_mouse_up(day) {
		this.setState( (prev_state, props) => {
			// open awesome popup
			// create new event if we have a selected range
			return {
				is_mouse_down:false,
				is_open:true
			}
		});
	};
	
	_handle_save() {
		console.log('called');
	}

  	render() {
  		const days = this.state.days.map((day) => {
  			return <ScheduleListDay 
	  			key={day.id}
	  			is_weekend={day.is_weekend}
	  			display_text={day.display_text}
	  			date={day.date}
	  			is_selected={day.is_selected}
	  			is_event={day.is_event}
	  			handle_mouse_down={day.handle_mouse_click}
	  			handle_mouse_enter={day.handle_mouse_enter}
	  			handle_mouse_up={day.handle_mouse_up}
	  			handle_mouse_leave={day.handle_mouse_leave}
  			/>
  		});
  		// onMouseLeave is bypassed for now
  		return ( <tr  onMouseLeave={this._handle_mouse_leave}>{days}</tr> )
  	};
}

export default ScheduleListRow;
