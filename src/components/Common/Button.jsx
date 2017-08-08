import React, { Component }  from 'react';
import moment                from 'moment';
import ReactDOM              from 'react-dom';
import _                     from 'lodash';

const Button = ({handle_mouse_down}) => {
    return (<button 
        className='btn btn-default'
        onClick={handle_mouse_down}>Book it!</button>)
}

export default Button;


