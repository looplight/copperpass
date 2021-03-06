import React from 'react';

const ScheduleListDay = ({display_text, date, is_weekend, is_selected, is_event, handle_mouse_down, handle_mouse_enter, handle_mouse_up, handle_mouse_leave,is_outside_of_current_month, is_user_info}) => {
	const _handle_mouse_down = (event) => {
		handle_mouse_down(display_text, date, event);
	};
	const _handle_mouse_enter = (event) => {
		handle_mouse_enter(display_text, date, event); 
	};
	const _handle_mouse_up = (event) => {
		handle_mouse_up(display_text, event);
	};
	const build_class = () => {
		let className = '';
		if(is_weekend)  className  += ' weekend';
		if(is_selected) className  += ' selected';
		if(is_event)    className  += ' event';
		if(!is_selected && !is_event) className += ' hover';
		if(is_outside_of_current_month) className = 'is-outside'
		className += ''
		return className;
	};

	const set_colspan = () => {
		let colspan = 0;
		if(is_user_info) colspan = 5;
		return colspan;
	}
	
	const className = build_class();
	const colspan   = set_colspan();
	
	return <td data-date={date}  className={className} colSpan={colspan} onMouseDown={_handle_mouse_down} onMouseEnter={_handle_mouse_enter} onMouseUp={_handle_mouse_up} onMouseLeave={handle_mouse_leave}>&nbsp;</td>;
};

export default ScheduleListDay;
