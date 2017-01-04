import React 			from 'react';

const ScheduleListDay = ({display_text, className, handle_mouse_click}) => {
	const _handle_mouse_click = () => {
		handle_mouse_click(display_text);
	}	
	return(<td className={className} onClick={_handle_mouse_click}>{display_text}</td>)
};

export default ScheduleListDay;