import React 			  from 'react';
import ScheduleListDay 	  from './ScheduleListDay';
import { shallow, mount } from 'enzyme';

describe('<ScheduleListDay/>', () => {

	it('renders without blowing up', () => {
		shallow(<ScheduleListDay/>);
	});

	it('calls the click handler callback when clicked', () => {
		const mock_handler = jest.fn();
		const wrapper = shallow(<ScheduleListDay handle_mouse_down={mock_handler} />);
		const found = wrapper.find('td').first();
		found.simulate('mousedown');
		expect(mock_handler).toHaveBeenCalled();
	});

	it('renders a single td', () => {
		const wrapper = shallow(<ScheduleListDay is_weekend={true}/>);
		expect(wrapper.find('td').length).toEqual(1);
	});

	it('sets correct class if is_weekend', () => {
		const wrapper = shallow(<ScheduleListDay is_weekend={true}/>);
		expect(wrapper.find('td').first().hasClass('weekend')).toEqual(true);
	});

	it('sets correct class if is_selected', () => {
		const wrapper = shallow(<ScheduleListDay is_selected={true}/>);
		expect(wrapper.find('td').first().hasClass('selected')).toEqual(true);
	});	
	it('sets correct class if is_event', () => {
		const wrapper = shallow(<ScheduleListDay is_event={true}/>);
		expect(wrapper.find('td').first().hasClass('event')).toEqual(true);
	});		
});
