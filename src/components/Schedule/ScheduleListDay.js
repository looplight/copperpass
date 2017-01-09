import React 			from 'react';

const ScheduleListDay = ({display_text, is_weekend, is_selected, handle_mouse_click, handle_mouse_enter}) => {
	const _handle_mouse_click = (event) => {
		handle_mouse_click(display_text, event);
	};
	const _handle_mouse_enter = (event) => {
		handle_mouse_enter(display_text, event);
	};
	const build_class = () => {
		let className = '';
		if(is_weekend) className += ' weekend';
		if(is_selected) className += ' selected';
		
		return className;
	};

	const className = build_class();
	return(<td className={className} onClick={_handle_mouse_click} onMouseEnter={_handle_mouse_enter}>{display_text}</td>)
};

export default ScheduleListDay;