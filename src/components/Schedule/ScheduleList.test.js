import React              from 'react';
import ScheduleList       from './ScheduleList';
import { shallow, mount } from 'enzyme';

describe('<ScheduleList/>', () => {
    it('renders without blowing up', () => {
        const rows = [{id:1, title:'Daniel', subtitle:'CEO'}];
        shallow(<ScheduleList rows={rows}/>);
    });
});

