import React 			 	 from 'react';
import moment 				 from 'moment';
import ScheduleListDay 		 from './ScheduleListDay';
import ReactDOM 			 from 'react-dom';
import _ 					 from 'lodash';
import shallowEqual 		 from 'shallowequal'
import deep from 'deep-equal';
const find_range = (date, props) => {
	if(!props.row.events || !props.row.events.length) return false;	

	//check state.events for a range containing 'date'
	const found_in_event = _.find(props.row.events, event => moment(date).isBetween(moment(event.start), moment(event.end), null, '[]'));
	return found_in_event;
}

const is_in_range = (date, range) => {
	let tmp = range.start;
	range.start = moment(range.start).isBefore(range.end) ? range.start : range.end;
	range.end = range.start === range.end ? tmp : range.end;
	const found_in_range = moment(date.date).isBetween(moment(range.start), moment(range.end), null, '[]');
	return !!found_in_range;
}

class ScheduleListRow extends React.PureComponent {
	constructor(props) {
		super(props);
		this._handle_mouse_down 		 = this._handle_mouse_down.bind(this);
		this._handle_mouse_enter 		 = this._handle_mouse_enter.bind(this)
		this._handle_mouse_up    		 = this._handle_mouse_up.bind(this);
		this._handle_mouse_leave		 = this._handle_mouse_leave.bind(this);

		//NOTE(daniel): maybe some of these should be received via props?
		this.state = {
      		is_mouse_down: false, // is selecting
      		is_starting_on_selected_day: undefined,
      		days: [],
      		events:[],
      		selected_ranges:[],
      		start_select_date:undefined,
      		highest_selected_day:undefined,
      		lowest_selected_day:undefined
    	};
	}

	componentWillMount() {
		document.addEventListener('mouseup', this.handle_click_outside.bind(this), true);	
		this.setState({
			days: this._build_columns(this.props.today, this.props.row.events, this.props.row.selected_ranges)
		});
	}

	componentWillUnmount() {
	    document.removeEventListener('mouseup', this.handle_click_outside.bind(this), true);
	}
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if(this.props.row.id === 1) {

		}
		//return true;
		return !shallowEqual(nextProps.row, this.props.row) || this.state.is_mouse_down !== nextState.is_mouse_down || !shallowEqual( _.map(nextState.days, 'is_selected'), _.map(this.state.days, 'is_selected')) || !shallowEqual( _.map(nextState.days, 'date'), _.map(this.state.days, 'date'));
	}
	componentWillReceiveProps(nextProps) {
			this.setState({
				//events: this.props.row.events,
				days: this._build_columns(this.props.today, this.props.row.events, this.props.row.selected_ranges)
			});
		//if(JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
			
		//}

	}

	handle_click_outside(event) {
		const domNode = ReactDOM.findDOMNode(this);
	    if ((!domNode || !domNode.contains(event.target))) {
	    	this._handle_mouse_up('', !!this.state.start_select_date);
			this.setState( (prev_state, props) => {
				return {
					is_mouse_down:false
				}
			});	    	
	    }		
	}
	_build_columns(today, events, selected_ranges) {
		const is_weekend = date => {
			return date.day() % 6 === 0;
		}

		const is_event = date => {
			if(!events || !events.length) return false;
			//check state.events for a range containing 'date'
			const found_in_event = _.find(events, event => moment(date.format('YYYY-MM-DD')).isBetween(moment(event.start), moment(event.end), null, '[]'));
			return !!found_in_event;
		}
		const is_selected = date => {
			//if(!selected_ranges || !selected_ranges.length) return false;	
			
			// find date in _get_selected_ranges
			const test = _.find(selected_ranges, range => moment(date.format('YYYY-MM-DD')).isBetween(moment(range.start), moment(range.end), null, '[]'));
			//const found_in_range = _.find(selected_ranges, range => moment(date.format('YYYY-MM-DD')).isBetween(moment(range.start), moment(range.end), null, '[]'));
			
			return !!test;
		}		
		// id day is in an event range, mark it as an event with correct class and event id (?)
		const days_in_month = 35// today.daysInMonth();
		const days = [];
		const previous_month_days = 0;
		for(let i = 0; i < /*37*/days_in_month; i++) {
			/*if(i < previous_month_days) {
				days.push({
					id:i,
					//is_weekend:true,
					is_outside_of_current_month:true,
					display_text:'',
					handle_mouse_click:this._handle_mouse_down,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down,
					handle_mouse_up: this._handle_mouse_up,					
				})
			}
			if(i >= days_in_month + previous_month_days) {
				days.push({
					id:i,
					//is_weekend:true,
					is_outside_of_current_month:true,
					display_text:'',
					handle_mouse_click:this._handle_mouse_down,
					handle_mouse_enter:this._handle_mouse_enter,
					handle_mouse_down: this._handle_mouse_down,
					handle_mouse_up: this._handle_mouse_up,					
				})		
			}*/	
			const day = moment(today).add(i - 1, 'day');
			//let full_day_text = day.format('YYYY-MM-DD');
			const day_text = day.format('D');

			if(i === 0) {
				days.push({
					id:i,
					display_text:'woohoo',
					is_user_info: true					
				})
			} else {
				days.push({
					id:i,
					is_weekend:is_weekend(day),
					display_text:day_text,
					date: day.format('YYYY-MM-DD'),
					is_selected:is_selected(day) && !is_event(day),
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
	
	_get_selected_ranges() {
		const all_selected_days = _.filter(this.state.days, day => day.is_selected);
		let is_start = true;
		let start;
		let end;
		const ranges = [];
		for(let i = 0; i < all_selected_days.length; i++) {
			if(is_start) start = all_selected_days[i].date;
			is_start = false;

			if( i !== all_selected_days.length - 1 && Math.abs(moment(all_selected_days[i].date).diff(moment(all_selected_days[i+1].date), 'days')) > 1) {
				end = all_selected_days[i].date;
				is_start = true;
				ranges.push({start, end})
			}

			if(i === all_selected_days.length - 1) {
				end = all_selected_days[i].date
				is_start = true;
				ranges.push({start, end})				
			}

		}
		return {ranges: ranges, id: this.props.row.id};
	}

	_handle_mouse_down(display_text, date, event) {
		event.preventDefault();
		this.setState((prev_state, props) => {
			const days_copy = _.cloneDeep(prev_state.days);
			const found = days_copy.find((day) => {
				return day.date === date;
			});
			if(!found) return prev_state;
			if(found.is_event) {
				found.is_selected = !found.is_selected;
				const found_range = find_range(found.date, this.props);
				found.is_selected = false;
				this.props.event_click({range:found_range, id: this.props.row.id});
				return {
					is_mouse_down:true,
					highest_selected_day:date,
					start_select_date: date,
					is_starting_on_event:true

				}				
			} 
			found.is_selected = !found.is_selected;
			return {
				days: days_copy,
				is_mouse_down:true,
				is_starting_on_selected_day: !found.is_selected, // invert it again so that we get the orignal state of the selection
				start_select_date:date,
				is_starting_on_event:false
			}
		});		
	};

	_handle_mouse_enter(display_text, date, event) {
		if(!this.state.is_mouse_down) return;
		this.setState((prev_state, props) => {
			const days_copy = _.cloneDeep(prev_state.days);
			const found = days_copy.find((day) => {
				return day.date === date;
			});

			// select in the 'right' direction
			if(!this.state.is_starting_on_selected_day && !this.state.is_starting_on_event) {
				const highest_date = moment(found.date).isAfter(moment(this.state.highest_selected_day || this.state.start_select_date)) ? found.date : (this.state.highest_selected_day || this.state.start_select_date);
				const lowest_date = moment(found.date).isBefore(moment(this.state.lowest_selected_day  || this.state.start_select_date)) ? found.date : (this.state.lowest_selected_day || this.state.start_select_date);
				
				const days_between_start_and_max = _.filter(days_copy, day => {
					return is_in_range(day, {start:this.state.start_select_date ,end:highest_date}) || is_in_range(day, {start:this.state.start_select_date ,end:lowest_date});
				})

				const to_select = _.filter(days_between_start_and_max, day => {
					return !day.is_user_info && (is_in_range(day, {start:this.state.start_select_date, end:found.date}) || is_in_range(day, {start:this.state.start_select_date, end:found.date}))
				})
				const diff = _.filter(days_between_start_and_max, day => {
					return !is_in_range(day, {start:this.state.start_select_date, end:found.date})
				})

				_.each(diff, day => {
					day.is_selected = false
				});
				_.each(to_select, day => {
					day.is_selected = true
				});

				/*
				if(!found || found.is_event) return prev_state;
				
				if(!this.state.is_starting_on_selected_day && found.is_selected) {
					found.is_selected = true;	
				} 
				else if(this.state.is_starting_on_selected_day && found.is_selected) {
					found.is_selected = false;
				}
				else {
					found.is_selected = !this.state.is_starting_on_selected_day && !found.is_selected ? !found.is_selected : found.is_selected;
				}*/
				return {
					days: days_copy,
					highest_selected_day: highest_date,
					lowest_selected_day:lowest_date,
					is_starting_on_event: false
				}				
			} else {
				found.is_selected = false;
				return {
					days: days_copy,
				}				
			}

		});				
	}	
	_handle_mouse_leave(display_text, event) {
		return;
		/*
		if(!this.state.is_mouse_down) return;
		this.setState( (prev_state, props) => {
			const days_copy = _.cloneDeep(this.state.days);
			return {
				days:days_copy
			}
		});		
		*/
	}

	_handle_mouse_up(display_text, should_update) {		
		if(should_update) this.props.update(this._get_selected_ranges());

		this.setState( (prev_state, props) => {
			return {
				is_mouse_down:false,
				highest_selected_day:undefined,
				lowest_selected_day:undefined,
				start_select_date:undefined
			}
		});
	};

  	render() {
  		//console.log('render', this.props.row.id);
  		//const d = this._build_columns(this.props.today, this.props.row.events, this.props.row.selected_ranges);
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
	  			is_user_info= {day.is_user_info}

  			/>
  		});
  		// onMouseLeave is bypassed for now
  		return ( <tr className="pointer separator" onMouseLeave={this._handle_mouse_leave}>{days}</tr> )
  	};
}

export default ScheduleListRow;
