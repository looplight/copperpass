import moment 				from 'moment';
import React 				from 'react';
import ReactDOM 			from 'react-dom';
import ScheduleListRow 		from './ScheduleListRow';
import ScheduleListDay		from './ScheduleListDay';
import Button				from '../Common/Button';
import ReactTestUtils 		from 'react-addons-test-utils'
import { shallow, mount } 	from 'enzyme';
import _ 					from 'lodash';
import sinon from 'sinon';

describe('<ScheduleListRow/>', () => {

	const my_date =  moment('2016-01-01');
	it('renders without blowing up',  () => {
		mount(<ScheduleListRow today={my_date}/>);
	});
	
	it('should start with an empty list of days', () => {
	   	const wrapper = shallow(<ScheduleListRow/>);
	   	expect(wrapper.state('days')).toEqual([]);
	});	

	// Checks state
	it('mounts with correct number of days given a month', () => {
		const my_date =  moment('2016-01-01');
		const number_of_days = my_date.daysInMonth();
		const wrapper = mount(<ScheduleListRow today={my_date}/>);
		expect(wrapper.state().days.length).toEqual(number_of_days);

	});
	// Checks render
	it('creates correct number of ScheduleListDay', () => {
		//NOTE(daniel): should we test all months?
		const my_date =  moment('2016-01-01');
		const number_of_days = my_date.daysInMonth();
		const wrapper = mount(<ScheduleListRow today={my_date}/>);

		const days = wrapper.find(ScheduleListDay);

		expect(days.length).toEqual(number_of_days);

	});

	it('passes _handle_mouse_down to all ScheduleListDay components', () => {		
		const my_date =  moment('2016-01-01');
	    const wrapper = mount(<ScheduleListRow today={my_date}/>);
	    const handler = wrapper.instance()._handle_mouse_down;

	    const days = wrapper.find(ScheduleListDay).forEach((day) => {
	    	expect(day.props().handle_mouse_down).toEqual(handler)
	    });
	});

	it('passes is_selected to all ScheduleListDay components', () => {		
		const my_date =  moment('2016-01-01');
	    const wrapper = mount(<ScheduleListRow today={my_date}/>);
	    

	    const days = wrapper.find(ScheduleListDay).forEach((day) => {
	    	expect(day.props().is_selected).toBeDefined();
	    });
	});

	it('handles_mouse_enter sets selected state to true when not already selected', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			is_mouse_down:true,
			days: [{
				id:2,
				is_selected:false,
				display_text:'display text'
			}]
		});
		wrapper.instance()._handle_mouse_enter('display text', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().days[0].is_selected).toEqual(true);
	});
	it('handles_mouse_enter sets selected state to false when already selected (and when starting on a non selected day)', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			is_mouse_down:true,
			days: [{
				id:2,
				is_selected:false,
				display_text:'display text 1'
			},
			{
				id:3,
				is_selected:true,
				display_text:'display text 2'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text 1', '2017-11-10', {preventDefault: () =>{}});
		wrapper.instance()._handle_mouse_enter('display text 2', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().days[1].is_selected).toEqual(true);
	});	
	it('handles_mouse_enter sets selected state to false when already selected (and when starting on a selected day)', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			is_mouse_down:true,
			days: [{
				id:2,
				is_selected:true,
				display_text:'display text 1'
			},
			{
				id:3,
				is_selected:true,
				display_text:'display text 2'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text 1', '2017-11-10', {preventDefault: () =>{}});
		wrapper.instance()._handle_mouse_enter('display text 2', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().days[1].is_selected).toEqual(false);
	});	

	it('never selects again when mouse enter and starting on selected day', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);		
		wrapper.setState({
			is_mouse_down:true,
			days: [{
				id:2,
				is_selected:true,
				display_text:'display text 1'
			},
			{
				id:3,
				is_selected:false,
				display_text:'display text 2'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text 1', '2017-11-10', {preventDefault: () =>{}});
		wrapper.instance()._handle_mouse_enter('display text 2', '2017-11-11', {preventDefault: () =>{}});

		expect(wrapper.state().days[1].is_selected).toEqual(false);		
	});

	it('sets is_starting_on_selected_day correctly when starting on selected day', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			is_starting_on_selected_day: undefined,
			days: [{
				id:2,
				is_selected:true,
				display_text:'display text'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().is_starting_on_selected_day).toEqual(true);
	});
	it('sets is_starting_on_selected_day correctly when starting on a non selected day', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			is_starting_on_selected_day: undefined,
			days: [{
				id:2,
				is_selected:false,
				display_text:'display text'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().is_starting_on_selected_day).toEqual(false);
	});	

	it('_handle_mouse_down sets selected state to true when not already selected', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		
		wrapper.setState({
			days: [{
				id:2,
				is_selected:false,
				display_text:'display text'
			}]
		});

		wrapper.instance()._handle_mouse_down('display text', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().days[0].is_selected).toEqual(true);
	});

	it('_handle_mouse_down sets selected state to false when already selected', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		
		wrapper.setState({
			days: [{
				id:1,
				is_selected:false,
				is_event:false,
				display_text:'display text 1'
			},
			{
				id:2,
				is_selected:false,
				is_event:true,
				display_text:'display text 2'				
			}]
		});

		wrapper.instance()._handle_mouse_down('display text 1', '2017-11-11', {preventDefault:() =>{}});
		wrapper.instance()._handle_mouse_enter('display text 2', '2017-11-11', {preventDefault: () =>{}});
		expect(wrapper.state().days[1].is_selected).toEqual(false);
	});

	it('marks a day as an event if date is in an event range', () => {
		//NOTE(daniel): we might want to check that all dates in the range are set
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			events: [
			{start: '2016-01-15', end: '2016-01-25'}],		
		});
		wrapper.setState({
			days: wrapper.instance()._build_columns(my_date)
		});
		const event_date = _.find(wrapper.state().days, day => day.date === '2016-01-20');
		expect(event_date.is_event).toEqual(true)
	});

	it('clicking event days does not set them to is_selected', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			days: [{
				id:1,
				is_selected:false,
				is_event:true,
				display_text:'display text'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text', '2017-11-11', {preventDefault:() =>{}});
		expect(wrapper.state().days[0].is_selected).toEqual(false);
	});

	it('draging on event days does not set them to is_selected', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		wrapper.setState({
			days: [{
				id:1,
				is_selected:false,
				is_event:true,
				display_text:'display text'
			}]
		});
		wrapper.instance()._handle_mouse_down('display text', '2017-11-11', {preventDefault:() =>{}});
		expect(wrapper.state().days[0].is_selected).toEqual(false);
	});	

	it('_handle_mouse_down handles day not found', () => {
		const my_date = moment('2016-01-01');
		const wrapper = shallow(<ScheduleListRow today={my_date}/>);
		var mock_state = {
			days: [{
				id:1,
				is_selected:false,
				display_text:'display text'
			}]
		}
		wrapper.setState(mock_state);
		wrapper.instance()._handle_mouse_down('display', '2017-11-11', {preventDefault:() =>{}});
		expect(wrapper.state().days).toEqual(mock_state.days);
	});

	it('calls click handler method when day is clicked', () => {
		const my_date =  moment('2016-01-01');
		// When a method is called with an event listener in a React component, the original method is always called and not the mocked one.
		// Handle this by using prototype
		const spy = ScheduleListRow.prototype._handle_mouse_down = jest.fn(function() {
			//console.log('Taking over the world!');
		});
		const wrapper = mount(<ScheduleListRow today={my_date}/>);

		wrapper.find(ScheduleListDay).first().simulate('mousedown');
		expect(spy).toHaveBeenCalled();
	});

	it('correctly marks a weekend', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = mount(<ScheduleListRow today={my_date}/>);

		const number_of_weekend_days = wrapper.find(ScheduleListDay).find('.weekend').length;

		expect(number_of_weekend_days).toEqual(10);
	});

	it('renders a button component', () => {
		const my_date =  moment('2016-01-01');
		const wrapper = mount(<ScheduleListRow today={my_date}/>);

		expect(wrapper.find(Button).length).toEqual(1);

	});

});
