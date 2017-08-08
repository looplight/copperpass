import moment               from 'moment';
import React                from 'react';
import ReactDOM             from 'react-dom';
import Button               from './Button';
import ReactTestUtils       from 'react-addons-test-utils'
import { shallow, mount }   from 'enzyme';
import _                    from 'lodash';
import sinon from 'sinon';

describe('<Button/>', () => {
    it('renders without blowing up',  () => {
        mount(<Button/>);
    });

    it('it renders a button', () => {
        const wrapper = mount(<Button/>)
        expect(wrapper.find('button').length).toEqual(1);
    });

    it('calles the click handler callback when clicked', () => {
        const spy = jest.fn();
        const wrapper = shallow(<Button handle_mouse_down={spy} />)
        
        const found = wrapper.find('button').first();
        found.simulate('click');
        expect(spy).toHaveBeenCalled();
    })
});

