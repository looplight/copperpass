import React     from 'react';

const Button = ({handle_mouse_down}) => {
    return (<button 
        className='btn btn-success'
        onClick={handle_mouse_down}>Book it!</button>)
}

export default Button;


