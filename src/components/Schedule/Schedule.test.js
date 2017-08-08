import React              from 'react';
import Schedule           from './Schedule';
import { shallow, mount } from 'enzyme';

describe('<Schedule/>', () => {
    it('renders without blowing up', () => {
        shallow(<Schedule/>);
    });
});
