import React              from 'react';
import ScheduleControls   from './ScheduleControls';
import { shallow, mount } from 'enzyme';

describe('<ScheduleControls/>', () => {
    it('renders without blowing up', () => {
        shallow(<ScheduleControls/>);
    });
        
});

